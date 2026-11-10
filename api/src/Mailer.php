<?php
/**
 * Email Sender using SMTP
 */

namespace App;

class Mailer
{
    private static array $config;

    private static function init(): void
    {
        if (!isset(self::$config)) {
            self::$config = require __DIR__ . '/../config/config.php';
        }
    }

    /**
     * Enviar email usando SMTP autenticado
     */
    public static function send(string $to, string $subject, string $html, bool $isInternal = false, array $attachments = []): bool
    {
        self::init();

        $smtp = self::$config['email']['smtp'] ?? null;

        // Si no hay configuración SMTP, usar mail() como fallback
        if (!$smtp) {
            return self::sendWithMail($to, $subject, $html, $attachments);
        }

        try {
            $result = self::sendWithSMTP($to, $subject, $html, $smtp, $attachments);
            if ($result) {
                error_log("[Mailer] SMTP EXITO enviando a: $to");
                return true;
            }
        } catch (\Exception $e) {
            error_log("[Mailer] SMTP ERROR: " . $e->getMessage());
        }

        // Fallback a mail() si SMTP falla
        error_log("[Mailer] Intentando fallback con mail()...");
        return self::sendWithMail($to, $subject, $html, $attachments);
    }

    /**
     * Normaliza adjuntos a base64 y arma el cuerpo multipart/mixed.
     * Cada adjunto: ['filename'=>..., 'mime'=>..., 'data'=>(dataURL o binario o base64)].
     */
    private static function buildMultipartBody(string $html, array $attachments, string $boundary): string
    {
        $nl = "\r\n";
        $b = "--$boundary$nl";
        $b .= "Content-Type: text/html; charset=UTF-8$nl";
        $b .= "Content-Transfer-Encoding: 8bit$nl$nl";
        $b .= $html . $nl . $nl;
        foreach ($attachments as $att) {
            $data = $att['data'] ?? '';
            $pos = strpos($data, 'base64,');
            if ($pos !== false) {
                $data = substr($data, $pos + 7);           // venía como data URL
            } elseif (!preg_match('/^[A-Za-z0-9+\/=\r\n]+$/', $data)) {
                $data = base64_encode($data);              // venía binario
            }
            $data = chunk_split(preg_replace('/\s+/', '', $data), 76, $nl);
            $fn = $att['filename'] ?? 'adjunto';
            $mime = $att['mime'] ?? 'application/octet-stream';
            $b .= "--$boundary$nl";
            $b .= "Content-Type: $mime; name=\"$fn\"$nl";
            $b .= "Content-Transfer-Encoding: base64$nl";
            $b .= "Content-Disposition: attachment; filename=\"$fn\"$nl$nl";
            $b .= $data . $nl;
        }
        $b .= "--$boundary--$nl";
        return $b;
    }
    
    /**
     * Enviar con SMTP autenticado
     */
    private static function sendWithSMTP(string $to, string $subject, string $html, array $smtp, array $attachments = []): bool
    {
        $host = ($smtp['secure'] === 'ssl' ? 'ssl://' : '') . $smtp['host'];
        $port = $smtp['port'];
        $username = $smtp['username'];
        $password = $smtp['password'];
        $from = self::$config['email']['from_email'] ?? $username;
        $fromName = self::$config['email']['from'];
        
        error_log("[Mailer] Conectando a SMTP $host:$port...");
        
        $socket = @fsockopen($host, $port, $errno, $errstr, 30);
        if (!$socket) {
            throw new \Exception("No se pudo conectar al servidor SMTP: $errstr ($errno)");
        }
        
        // Configurar timeout
        stream_set_timeout($socket, 30);
        
        // Leer respuesta inicial (el saludo 220 puede venir en varias líneas)
        $response = self::readSmtpResponse($socket);
        if (substr($response, 0, 3) !== '220') {
            fclose($socket);
            throw new \Exception("Respuesta SMTP inesperada: $response");
        }

        // EHLO (respuesta multilínea)
        fwrite($socket, "EHLO cialo.cl\r\n");
        self::readSmtpResponse($socket);

        // AUTH LOGIN
        fwrite($socket, "AUTH LOGIN\r\n");
        self::readSmtpResponse($socket);

        fwrite($socket, base64_encode($username) . "\r\n");
        self::readSmtpResponse($socket);

        fwrite($socket, base64_encode($password) . "\r\n");
        $response = self::readSmtpResponse($socket);
        if (substr($response, 0, 3) !== '235') {
            fclose($socket);
            throw new \Exception("Autenticación SMTP fallida: $response");
        }

        // MAIL FROM
        fwrite($socket, "MAIL FROM:<$from>\r\n");
        self::readSmtpResponse($socket);

        // RCPT TO
        fwrite($socket, "RCPT TO:<$to>\r\n");
        self::readSmtpResponse($socket);

        // DATA
        fwrite($socket, "DATA\r\n");
        self::readSmtpResponse($socket);

        // Headers y contenido (asunto y nombre del remitente codificados en MIME UTF-8)
        // Date y Message-ID son OBLIGATORIOS para deliverability: sin ellos, Gmail y
        // otros filtros marcan el correo como spam o lo descartan silenciosamente.
        $headers = "From: " . self::encodeFrom($fromName) . "\r\n";
        $headers .= "To: $to\r\n";
        $headers .= "Subject: " . self::encodeHeader($subject) . "\r\n";
        $headers .= "Date: " . date('r') . "\r\n";
        $headers .= "Message-ID: <" . bin2hex(random_bytes(16)) . "@cialo.cl>\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        if (!empty($attachments)) {
            $boundary = 'cialo_' . md5(uniqid('', true));
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
            $headers .= "Reply-To: " . self::$config['email']['clinic_email'] . "\r\n";
            $headers .= "\r\n";
            $body = self::buildMultipartBody($html, $attachments, $boundary);
        } else {
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
            $headers .= "Reply-To: " . self::$config['email']['clinic_email'] . "\r\n";
            $headers .= "\r\n";
            $body = $html;
        }

        fwrite($socket, $headers . $body . "\r\n.\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) !== '250') {
            fclose($socket);
            throw new \Exception("Error enviando DATA: $response");
        }
        
        // QUIT
        fwrite($socket, "QUIT\r\n");
        fclose($socket);
        
        return true;
    }
    
    /**
     * Leer respuesta SMTP multilínea
     */
    private static function readSmtpResponse($socket): string
    {
        $response = '';
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            // En respuestas multilínea la última línea usa "CODIGO " (espacio en la pos. 3)
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $response;
    }

    /**
     * Codificar un encabezado (ej. Subject) en MIME UTF-8 si contiene
     * caracteres no ASCII (acentos, emojis). Si es ASCII puro, lo deja igual.
     */
    private static function encodeHeader(string $text): string
    {
        if (preg_match('/[\x80-\xFF]/', $text)) {
            return '=?UTF-8?B?' . base64_encode($text) . '?=';
        }
        return $text;
    }

    /**
     * Codificar el "From" preservando el email entre <>.
     * Ej: "Clínica Cialo <no-responder@cialo.cl>" -> nombre codificado + <email> intacto.
     */
    private static function encodeFrom(string $from): string
    {
        if (preg_match('/^(.*)<([^>]+)>\s*$/', $from, $m)) {
            $name = trim($m[1]);
            $addr = trim($m[2]);
            return self::encodeHeader($name) . " <$addr>";
        }
        return self::encodeHeader($from);
    }
    
    /**
     * Fallback: Enviar con mail() nativo
     */
    private static function sendWithMail(string $to, string $subject, string $html, array $attachments = []): bool
    {
        $from = self::$config['email']['from'];
        $fromEmail = self::$config['email']['from_email'] ?? 'no-responder@cialo.cl';

        $headers = [
            'MIME-Version: 1.0',
            'From: ' . self::encodeFrom($from),
            'Reply-To: ' . self::$config['email']['clinic_email'],
            'Return-Path: ' . $fromEmail,
            // Date y Message-ID obligatorios para no ser marcado como spam.
            'Date: ' . date('r'),
            'Message-ID: <' . bin2hex(random_bytes(16)) . '@cialo.cl>',
            'X-Mailer: PHP/' . phpversion(),
        ];

        if (!empty($attachments)) {
            $boundary = 'cialo_' . md5(uniqid('', true));
            $headers[] = "Content-Type: multipart/mixed; boundary=\"$boundary\"";
            $body = self::buildMultipartBody($html, $attachments, $boundary);
        } else {
            $headers[] = 'Content-type: text/html; charset=UTF-8';
            $body = $html;
        }

        // Asunto codificado en MIME UTF-8 (evita que emojis/acentos sin codificar hagan que el correo se descarte)
        $encodedSubject = self::encodeHeader($subject);

        $result = @mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $fromEmail);
        
        if ($result) {
            error_log("[Mailer] mail() EXITO enviando a: $to");
        } else {
            error_log("[Mailer] mail() ERROR enviando a: $to");
        }
        
        return $result;
    }

    /**
     * Enviar email de confirmación de orden al cliente
     */
    public static function sendOrderConfirmation(array $order): bool
    {
        self::init();
        
        $html = self::getOrderConfirmationTemplate($order);
        $subject = "Confirmación de compra - {$order['order_number']}";
        
        return self::send($order['customer_email'], $subject, $html, false);
    }

    /**
     * Enviar notificación de nueva orden a la clínica
     * Envía a pagos@cialo.cl y contacto@cialo.cl
     */
    public static function sendClinicNotification(array $order): bool
    {
        self::init();
        
        $html = self::getClinicNotificationTemplate($order);
        $subject = "Nueva Venta - {$order['order_number']} - $" . number_format($order['total'], 0, ',', '.');
        
        // Enviar a múltiples destinatarios (emails internos del mismo dominio)
        $recipients = [
            'pagos@cialo.cl',
            'contacto@cialo.cl'
        ];
        
        error_log("[Mailer] === INICIO envío notificación clínica ===");
        error_log("[Mailer] Order: {$order['order_number']} | Destinatarios: " . implode(', ', $recipients));
        
        $success = true;
        $sentCount = 0;
        
        foreach ($recipients as $index => $email) {
            error_log("[Mailer] Enviando a [$index]: $email");
            
            // Pausa entre envíos para evitar rate limiting (1 segundo)
            if ($sentCount > 0) {
                error_log("[Mailer] Esperando 1.5s antes del siguiente envío...");
                usleep(1500000); // 1.5 segundos
            }
            
            $result = self::send($email, $subject, $html, true);
            
            if (!$result) {
                error_log("[Mailer] ❌ FALLO envío a: $email");
                $success = false;
            } else {
                error_log("[Mailer] ✓ ÉXITO envío a: $email");
                $sentCount++;
            }
        }
        
        error_log("[Mailer] === FIN notificación clínica: $sentCount/" . count($recipients) . " enviados ===");
        return $success;
    }

    /**
     * Enviar ambos emails
     */
    public static function sendOrderEmails(array $order): void
    {
        self::sendOrderConfirmation($order);
        self::sendClinicNotification($order);
    }

    /**
     * Template base
     */
    private static function baseTemplate(string $content): string
    {
        return <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clínica Cialo</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #1d1d1d; padding: 30px; text-align: center;">
                            <h1 style="margin: 0; color: #d4c1a0; font-size: 28px; font-weight: 300; letter-spacing: 2px;">CLÍNICA CIALO</h1>
                            <p style="margin: 5px 0 0; color: #cbcfd1; font-size: 12px; letter-spacing: 1px;">MEDICINA ESTÉTICA</p>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            {$content}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9f9f9; padding: 30px; text-align: center; border-top: 1px solid #eee;">
                            <p style="margin: 0 0 10px; color: #4f4f51; font-size: 14px;">
                                <strong>Clínica Cialo</strong><br>
                                Bulnes 220, Of. 509, Los Ángeles, Chile
                            </p>
                            <p style="margin: 0; color: #888; font-size: 12px;">
                                Tel: +56 9 8202 8473 | contacto@cialo.cl
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    }

    /**
     * Template de confirmación de orden
     */
    private static function getOrderConfirmationTemplate(array $order): string
    {
        $items = $order['items'] ?? [];
        $itemsHtml = '';
        
        foreach ($items as $item) {
            $typeLabel = $item['type'] === 'producto' ? 'Producto' : 'Tratamiento';
            $typeBg = $item['type'] === 'producto' ? '#e3f2fd' : '#f3e5f5';
            $typeColor = $item['type'] === 'producto' ? '#1976d2' : '#7b1fa2';
            $subtotal = number_format($item['price'] * $item['quantity'], 0, ',', '.');
            
            $itemsHtml .= <<<HTML
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    <span style="display: inline-block; background-color: {$typeBg}; color: {$typeColor}; font-size: 10px; padding: 2px 8px; border-radius: 4px;">{$typeLabel}</span>
                    <p style="margin: 4px 0 0; font-weight: 500; color: #1d1d1d;">{$item['name']}</p>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center; color: #666;">{$item['quantity']}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-weight: 600; color: #1d1d1d;">\${$subtotal}</td>
            </tr>
HTML;
        }

        $total = number_format($order['total'], 0, ',', '.');
        $retiroSection = '';
        
        if (!empty($order['retiro_code'])) {
            $retiroSection = <<<HTML
            <div style="background-color: #fff8e1; border: 2px solid #d4c1a0; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
                <p style="margin: 0 0 10px; color: #4f4f51; font-size: 14px;">Tu código de retiro</p>
                <p style="margin: 0; font-size: 32px; font-weight: bold; color: #d4c1a0; letter-spacing: 4px;">{$order['retiro_code']}</p>
                <p style="margin: 10px 0 0; color: #666; font-size: 12px;">Presenta este código en Clínica Cialo para retirar tus productos</p>
            </div>
HTML;
        }

        $customerName = $order['customer_name'] ?? 'Cliente';

        $content = <<<HTML
        <h2 style="margin: 0 0 20px; color: #1d1d1d; font-size: 24px; font-weight: 400;">¡Gracias por tu compra!</h2>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Hola <strong>{$customerName}</strong>,<br><br>
            Tu pago ha sido procesado exitosamente.
        </p>

        <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <table width="100%" style="font-size: 14px;">
                <tr>
                    <td style="color: #888;">Número de orden:</td>
                    <td style="text-align: right; font-weight: 600; color: #1d1d1d;">{$order['order_number']}</td>
                </tr>
            </table>
        </div>

        {$retiroSection}

        <h3 style="margin: 30px 0 15px; color: #1d1d1d; font-size: 18px;">Detalle del pedido</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr style="background-color: #f5f5f5;">
                <th style="padding: 12px; text-align: left; color: #666;">Producto</th>
                <th style="padding: 12px; text-align: center; color: #666;">Cant.</th>
                <th style="padding: 12px; text-align: right; color: #666;">Precio</th>
            </tr>
            {$itemsHtml}
            <tr>
                <td colspan="2" style="padding: 15px 12px; text-align: right; font-weight: 600; color: #1d1d1d; font-size: 16px;">Total:</td>
                <td style="padding: 15px 12px; text-align: right; font-weight: 700; color: #d4c1a0; font-size: 20px;">\${$total}</td>
            </tr>
        </table>
HTML;

        return self::baseTemplate($content);
    }

    /**
     * Template de notificación a clínica
     */
    private static function getClinicNotificationTemplate(array $order): string
    {
        $total = number_format($order['total'], 0, ',', '.');
        
        $itemsHtml = '';
        foreach ($order['items'] ?? [] as $item) {
            $subtotal = number_format($item['price'] * $item['quantity'], 0, ',', '.');
            $itemsHtml .= "<tr><td style='padding: 10px; border-bottom: 1px solid #eee;'>{$item['name']}</td><td style='padding: 10px; border-bottom: 1px solid #eee; text-align: center;'>{$item['quantity']}</td><td style='padding: 10px; border-bottom: 1px solid #eee; text-align: right;'>\${$subtotal}</td></tr>";
        }

        $content = <<<HTML
        <h2 style="margin: 0 0 20px; color: #1d1d1d; font-size: 24px;">🛒 Nueva Venta Online</h2>
        
        <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #2e7d32; font-weight: 600;">Pago confirmado por \${$total}</p>
        </div>

        <h3 style="margin: 20px 0 15px; color: #1d1d1d; font-size: 16px;">👤 Datos del Cliente</h3>
        <table width="100%" style="font-size: 14px; background-color: #f9f9f9; border-radius: 8px;">
            <tr>
                <td style="padding: 10px 15px; color: #888;">Nombre:</td>
                <td style="padding: 10px 15px; font-weight: 600;">{$order['customer_name']}</td>
            </tr>
            <tr>
                <td style="padding: 10px 15px; color: #888;">Email:</td>
                <td style="padding: 10px 15px;">{$order['customer_email']}</td>
            </tr>
            <tr>
                <td style="padding: 10px 15px; color: #888;">Teléfono:</td>
                <td style="padding: 10px 15px;">{$order['customer_phone']}</td>
            </tr>
            <tr>
                <td style="padding: 10px 15px; color: #888;">RUT:</td>
                <td style="padding: 10px 15px;">{$order['customer_rut']}</td>
            </tr>
        </table>

        <h3 style="margin: 30px 0 15px; color: #1d1d1d; font-size: 16px;">📦 Pedido #{$order['order_number']}</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
            <tr style="background-color: #1d1d1d;">
                <th style="padding: 12px; text-align: left; color: #fff;">Item</th>
                <th style="padding: 12px; text-align: center; color: #fff;">Cant.</th>
                <th style="padding: 12px; text-align: right; color: #fff;">Precio</th>
            </tr>
            {$itemsHtml}
            <tr style="background-color: #d4c1a0;">
                <td colspan="2" style="padding: 12px; text-align: right; font-weight: 600; color: #1d1d1d;">TOTAL:</td>
                <td style="padding: 12px; text-align: right; font-weight: 700; color: #1d1d1d; font-size: 18px;">\${$total}</td>
            </tr>
        </table>
HTML;

        return self::baseTemplate($content);
    }

    /**
     * Enviar notificación de contacto a la clínica
     */
    public static function sendContactNotification(array $contact): bool
    {
        self::init();
        
        $html = self::getContactNotificationTemplate($contact);
        $subject = "📧 Nuevo Mensaje de Contacto - {$contact['subject']}";
        
        return self::send('contacto@cialo.cl', $subject, $html);
    }

    /**
     * Enviar confirmación de contacto al usuario
     */
    public static function sendContactConfirmation(array $contact): bool
    {
        self::init();
        
        $html = self::getContactConfirmationTemplate($contact);
        $subject = "Hemos recibido tu mensaje - Clínica Cialo";
        
        return self::send($contact['email'], $subject, $html);
    }

    // ============================================
    // Gift Cards
    // ============================================

    private static function giftValorLabel(array $g): string
    {
        if (($g['tipo'] ?? 'valor') === 'tratamiento' && !empty($g['tratamiento'])) {
            return $g['tratamiento'];
        }
        return '$' . number_format((int) ($g['monto'] ?? 0), 0, ',', '.');
    }

    /**
     * Notificación de nueva Gift Card a la clínica (pagos@ + contacto@).
     */
    public static function sendGiftCardNotification(array $gift): bool
    {
        self::init();

        $html = self::getGiftCardNotificationTemplate($gift);
        $modo = ($gift['modo'] ?? 'prueba') === 'prueba' ? ' [PRUEBA - sin pago]' : '';
        $subject = "Nueva Gift Card - " . self::giftValorLabel($gift) . $modo;
        $attachments = self::giftAttachments($gift);

        $recipients = ['pagos@cialo.cl', 'contacto@cialo.cl'];
        $ok = true;
        $sent = 0;
        foreach ($recipients as $email) {
            if ($sent > 0) usleep(1500000);
            if (self::send($email, $subject, $html, true, $attachments)) { $sent++; } else { $ok = false; }
        }
        return $ok;
    }

    /**
     * Arma el adjunto de la imagen de la Gift Card si viene en el payload.
     */
    private static function giftAttachments(array $gift): array
    {
        if (empty($gift['imagen'])) return [];
        $codigo = preg_replace('/[^A-Za-z0-9_-]/', '', $gift['codigo'] ?? 'CIALO');
        return [[
            'filename' => "GiftCard_{$codigo}.png",
            'mime'     => 'image/png',
            'data'     => $gift['imagen'],
        ]];
    }

    /**
     * Confirmación de Gift Card al comprador.
     */
    public static function sendGiftCardConfirmation(array $gift): bool
    {
        self::init();

        $html = self::getGiftCardConfirmationTemplate($gift);
        $subject = "Tu Gift Card de Clínica Cialo";

        return self::send($gift['comprador']['email'], $subject, $html, false, self::giftAttachments($gift));
    }

    private static function getGiftCardNotificationTemplate(array $g): string
    {
        $valor = self::giftValorLabel($g);
        $tipo = ($g['tipo'] ?? 'valor') === 'tratamiento' ? 'Por tratamiento' : 'Por valor';
        $modo = ($g['modo'] ?? 'prueba') === 'prueba'
            ? '<div style="background:#fff3cd;border-left:4px solid #ff9900;padding:12px;margin-bottom:20px;color:#7a5b00;font-weight:600;">⚠️ MODO PRUEBA — esta Gift Card se generó SIN pago por Webpay.</div>'
            : '<div style="background:#e8f5e9;border-left:4px solid #4caf50;padding:12px;margin-bottom:20px;color:#2e7d32;font-weight:600;">✅ Pago confirmado.</div>';

        $c = $g['comprador'];
        $content = <<<HTML
        <h2 style="margin:0 0 20px;color:#1d1d1d;font-size:24px;">🎁 Nueva Gift Card</h2>
        {$modo}
        <table width="100%" style="font-size:14px;background:#f9f9f9;border-radius:8px;">
            <tr><td style="padding:10px 15px;color:#888;width:150px;">Valor / Tratamiento:</td><td style="padding:10px 15px;font-weight:700;color:#d4c1a0;">{$valor}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Tipo:</td><td style="padding:10px 15px;">{$tipo}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Código:</td><td style="padding:10px 15px;font-family:monospace;font-weight:700;">{$g['codigo']}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Para (destinatario):</td><td style="padding:10px 15px;">{$g['destinatario']}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">De (remitente):</td><td style="padding:10px 15px;">{$g['remitente']}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Mensaje:</td><td style="padding:10px 15px;">{$g['mensaje']}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Válida hasta:</td><td style="padding:10px 15px;">{$g['vencimiento']}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Estilo:</td><td style="padding:10px 15px;">{$g['estilo']}</td></tr>
        </table>

        <h3 style="margin:30px 0 15px;color:#1d1d1d;font-size:16px;">👤 Comprador</h3>
        <table width="100%" style="font-size:14px;background:#f9f9f9;border-radius:8px;">
            <tr><td style="padding:10px 15px;color:#888;width:150px;">Nombre:</td><td style="padding:10px 15px;font-weight:600;">{$c['nombre']}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Email:</td><td style="padding:10px 15px;"><a href="mailto:{$c['email']}">{$c['email']}</a></td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Teléfono:</td><td style="padding:10px 15px;">{$c['telefono']}</td></tr>
            <tr><td style="padding:10px 15px;color:#888;">Fecha:</td><td style="padding:10px 15px;">{$g['fecha']}</td></tr>
        </table>
HTML;
        return self::baseTemplate($content);
    }

    private static function getGiftCardConfirmationTemplate(array $g): string
    {
        $valor = self::giftValorLabel($g);
        $content = <<<HTML
        <h2 style="margin:0 0 20px;color:#1d1d1d;font-size:24px;">🎁 ¡Tu Gift Card está lista!</h2>
        <p style="color:#666;font-size:16px;line-height:1.6;">
            Hola <strong>{$g['comprador']['nombre']}</strong>,<br><br>
            Gracias por elegir Clínica Cialo. Estos son los datos de tu Gift Card:
        </p>
        <div style="background:#f9f9f9;border-radius:8px;padding:20px;margin:20px 0;">
            <table width="100%" style="font-size:14px;">
                <tr><td style="color:#888;padding:6px 0;">Valor / Tratamiento:</td><td style="text-align:right;font-weight:700;color:#d4c1a0;">{$valor}</td></tr>
                <tr><td style="color:#888;padding:6px 0;">Código:</td><td style="text-align:right;font-family:monospace;font-weight:700;">{$g['codigo']}</td></tr>
                <tr><td style="color:#888;padding:6px 0;">Para:</td><td style="text-align:right;">{$g['destinatario']}</td></tr>
                <tr><td style="color:#888;padding:6px 0;">Válida hasta:</td><td style="text-align:right;">{$g['vencimiento']}</td></tr>
            </table>
        </div>
        <p style="color:#666;font-size:14px;line-height:1.6;">
            Nuestro equipo se pondrá en contacto contigo para coordinar la entrega y el pago.
            Presenta el código en la clínica para hacerla efectiva.
        </p>
        <p style="color:#888;font-size:12px;margin-top:30px;">Este es un correo automático, por favor no respondas a este mensaje.</p>
HTML;
        return self::baseTemplate($content);
    }

    /**
     * Template de notificación de contacto a la clínica
     */
    private static function getContactNotificationTemplate(array $contact): string
    {
        $content = <<<HTML
        <h2 style="margin: 0 0 20px; color: #1d1d1d; font-size: 24px;">📧 Nuevo Mensaje de Contacto</h2>
        
        <div style="background-color: #e3f2fd; border-left: 4px solid #1976d2; padding: 15px; margin-bottom: 20px;">
            <p style="margin: 0; color: #1565c0; font-weight: 600;">{$contact['subject']}</p>
        </div>

        <h3 style="margin: 20px 0 15px; color: #1d1d1d; font-size: 16px;">👤 Datos del Contacto</h3>
        <table width="100%" style="font-size: 14px; background-color: #f9f9f9; border-radius: 8px;">
            <tr>
                <td style="padding: 10px 15px; color: #888; width: 100px;">Nombre:</td>
                <td style="padding: 10px 15px; font-weight: 600;">{$contact['name']}</td>
            </tr>
            <tr>
                <td style="padding: 10px 15px; color: #888;">Email:</td>
                <td style="padding: 10px 15px;"><a href="mailto:{$contact['email']}" style="color: #1976d2;">{$contact['email']}</a></td>
            </tr>
            <tr>
                <td style="padding: 10px 15px; color: #888;">Teléfono:</td>
                <td style="padding: 10px 15px;">{$contact['phone']}</td>
            </tr>
            <tr>
                <td style="padding: 10px 15px; color: #888;">Fecha:</td>
                <td style="padding: 10px 15px;">{$contact['date']}</td>
            </tr>
        </table>

        <h3 style="margin: 30px 0 15px; color: #1d1d1d; font-size: 16px;">💬 Mensaje</h3>
        <div style="background-color: #fff; border: 1px solid #eee; border-radius: 8px; padding: 20px;">
            <p style="margin: 0; color: #4f4f51; line-height: 1.6; white-space: pre-wrap;">{$contact['message']}</p>
        </div>

        <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:{$contact['email']}?subject=Re: {$contact['subject']}" 
               style="display: inline-block; background-color: #d4c1a0; color: #1d1d1d; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600;">
                Responder al Cliente
            </a>
        </div>
HTML;

        return self::baseTemplate($content);
    }

    /**
     * Template de confirmación de contacto al usuario
     */
    private static function getContactConfirmationTemplate(array $contact): string
    {
        $content = <<<HTML
        <h2 style="margin: 0 0 20px; color: #1d1d1d; font-size: 24px;">¡Hemos recibido tu mensaje!</h2>
        
        <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Hola <strong>{$contact['name']}</strong>,<br><br>
            Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos a la brevedad.
        </p>

        <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 10px; color: #888; font-size: 14px;">Tu mensaje:</p>
            <p style="margin: 0; color: #4f4f51; line-height: 1.6; font-style: italic;">"{$contact['message']}"</p>
        </div>

        <p style="color: #666; font-size: 14px; line-height: 1.6;">
            Si necesitas una respuesta inmediata, escríbenos por WhatsApp al
            <strong>+56 9 8202 8473</strong> en horario de atención.
        </p>

        <p style="color: #888; font-size: 12px; margin-top: 30px;">
            Este es un correo automático, por favor no respondas a este mensaje.
        </p>
HTML;

        return self::baseTemplate($content);
    }
}
