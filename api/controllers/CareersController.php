<?php
// api/controllers/CareersController.php
// Postulaciones "Trabaja con Nosotros": guarda el lead en la tabla contacts
// (visible en /admin/contactos), guarda el CV en storage/cvs (respaldo que no
// depende del correo) y envía la notificación con el CV adjunto.

namespace App\Controllers;

use App\Mailer;
use App\Database;

class CareersController
{
    private const MAX_CV_BYTES = 4 * 1024 * 1024; // 4 MB
    private const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

    // Correos que reciben cada postulación con el CV adjunto. Se usan direcciones
    // EXTERNAS a propósito: contacto@cialo.cl está en Google Workspace y no recibe
    // el correo que sale de banahosting (enrutamiento local del dominio). Estas
    // direcciones externas sí se entregan. Editar esta lista para cambiar destinatarios.
    private const NOTIFY = [
        'dr.laucirica@gmail.com',
        'salascifuentespablo@gmail.com',
        'ngarcia@travelsuites.cl',
    ];

    private static function cvDir(): string
    {
        return __DIR__ . '/../storage/cvs';
    }

    /**
     * POST /careers — recibir una postulación (público).
     */
    public function submit(): void
    {
        header('Content-Type: application/json');
        $input = json_decode(file_get_contents('php://input'), true) ?? [];

        // Validación de campos obligatorios
        foreach (['nombre', 'email', 'especialidad'] as $f) {
            if (empty(trim($input[$f] ?? ''))) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "El campo '$f' es obligatorio"]);
                return;
            }
        }
        if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'El email no es válido']);
            return;
        }

        $id = Database::uuid();

        // ── CV: llega como { filename, mime, data(dataURL base64) } ──
        $cv = $input['cv'] ?? null;
        $cvAttachment = null;
        $cvFilename = null;
        if (is_array($cv) && !empty($cv['data'])) {
            $dataUrl = $cv['data'];
            $pos = strpos($dataUrl, 'base64,');
            $b64 = $pos !== false ? substr($dataUrl, $pos + 7) : $dataUrl;
            $bin = base64_decode($b64, true);
            if ($bin === false) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'El archivo del CV es inválido']);
                return;
            }
            if (strlen($bin) > self::MAX_CV_BYTES) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'El CV supera el máximo de 4 MB']);
                return;
            }
            $rawName = (string) ($cv['filename'] ?? 'cv');
            $ext = strtolower(pathinfo($rawName, PATHINFO_EXTENSION));
            if (!in_array($ext, self::ALLOWED_EXT, true)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Formato de CV no permitido. Usa PDF, DOC o DOCX.']);
                return;
            }
            $cvFilename = $rawName;
            $safe = $id . '_' . preg_replace('/[^A-Za-z0-9._-]/', '_', $rawName);

            // Guardar en disco (respaldo independiente del correo)
            $dir = self::cvDir();
            if (!is_dir($dir)) {
                @mkdir($dir, 0755, true);
            }
            @file_put_contents($dir . '/' . $safe, $bin);

            // Adjunto para el correo (data URL original; el Mailer extrae el base64)
            $cvAttachment = [
                'filename' => preg_replace('/[^A-Za-z0-9._-]/', '_', $rawName),
                'mime' => $cv['mime'] ?? 'application/octet-stream',
                'data' => $dataUrl,
            ];
        }

        $nombre       = trim($input['nombre']);
        $email        = trim($input['email']);
        $telefono     = trim($input['telefono'] ?? '');
        $titulo       = trim($input['titulo'] ?? '');
        $especialidad = trim($input['especialidad']);
        $experiencia  = trim($input['experiencia'] ?? '');
        $mensaje      = trim($input['mensaje'] ?? '');

        // Resumen para la tabla contacts (visible en /admin/contactos)
        $resumen = "Título / Profesión: " . ($titulo ?: '—') . "\n"
            . "Especialidad: $especialidad\n"
            . "Experiencia: " . ($experiencia ?: '—') . "\n"
            . "CV: " . ($cvFilename ?: 'No adjuntó') . "\n"
            . ($mensaje !== '' ? "\nMensaje:\n$mensaje" : '');

        // Persistir como contacto (nunca lanza: el correo es el respaldo)
        try {
            Database::getInstance()->query(
                "INSERT INTO contacts (id, name, email, phone, subject, message, estado, utm_source, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, 'nuevo', 'trabaja-con-nosotros', NOW())",
                [
                    $id,
                    mb_substr($nombre, 0, 150),
                    mb_substr($email, 0, 150),
                    mb_substr($telefono, 0, 50),
                    mb_substr("Trabaja con Nosotros — $especialidad", 0, 200),
                    $resumen,
                ]
            );
        } catch (\Throwable $e) {
            error_log('Careers persist error: ' . $e->getMessage());
        }

        // Notificación con el CV adjunto a cada correo del equipo (direcciones externas).
        try {
            $html = self::notifTemplate($nombre, $email, $telefono, $titulo, $especialidad, $experiencia, $mensaje, $cvFilename);
            $subject = "Nueva postulación — $especialidad ($nombre)";
            $attachments = $cvAttachment ? [$cvAttachment] : [];
            foreach (self::NOTIFY as $i => $to) {
                if ($i > 0) {
                    usleep(1200000); // pausa entre envíos para evitar rate limiting
                }
                Mailer::send($to, $subject, $html, true, $attachments);
            }

            // Confirmación al postulante
            usleep(1200000);
            Mailer::send($email, 'Recibimos tu postulación — Clínica Cialo', self::confirmTemplate($nombre), false);
        } catch (\Throwable $e) {
            error_log('Careers email error: ' . $e->getMessage());
        }

        echo json_encode([
            'success' => true,
            'message' => '¡Postulación enviada! Revisaremos tu perfil y te contactaremos.',
        ]);
    }

    /**
     * GET /careers/cv/{id} (admin) — descargar el CV de una postulación.
     */
    public function downloadCv(string $id): void
    {
        $id = preg_replace('/[^A-Za-z0-9-]/', '', $id);
        $matches = glob(self::cvDir() . '/' . $id . '_*');
        if (empty($matches) || !is_file($matches[0])) {
            http_response_code(404);
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'CV no encontrado']);
            return;
        }
        $file = $matches[0];
        $name = preg_replace('/^' . preg_quote($id, '/') . '_/', '', basename($file));
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        $mime = ['pdf' => 'application/pdf', 'doc' => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'][$ext] ?? 'application/octet-stream';

        header('Content-Type: ' . $mime);
        header('Content-Disposition: attachment; filename="' . $name . '"');
        header('Content-Length: ' . filesize($file));
        readfile($file);
    }

    private static function esc(string $s): string
    {
        return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
    }

    private static function notifTemplate(
        string $nombre, string $email, string $telefono, string $titulo,
        string $especialidad, string $experiencia, string $mensaje, ?string $cvFilename
    ): string {
        $rows = [
            'Nombre' => $nombre,
            'Email' => $email,
            'Teléfono' => $telefono ?: '—',
            'Título / Profesión' => $titulo ?: '—',
            'Especialidad' => $especialidad,
            'Experiencia' => $experiencia ?: '—',
            'CV adjunto' => $cvFilename ?: 'No adjuntó',
        ];
        $tr = '';
        foreach ($rows as $k => $v) {
            $tr .= '<tr><td style="padding:10px 15px;color:#888;width:170px;">' . self::esc($k)
                . ':</td><td style="padding:10px 15px;font-weight:600;color:#1d1d1d;">' . self::esc($v) . '</td></tr>';
        }
        $msgBlock = $mensaje !== ''
            ? '<h3 style="margin:25px 0 12px;color:#1d1d1d;font-size:16px;">Mensaje</h3>'
              . '<div style="background:#fff;border:1px solid #eee;border-radius:8px;padding:16px;color:#4f4f51;line-height:1.6;white-space:pre-wrap;">'
              . self::esc($mensaje) . '</div>'
            : '';

        return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>'
            . '<body style="margin:0;padding:0;font-family:Segoe UI,Tahoma,sans-serif;background:#f5f5f5;">'
            . '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;"><tr><td align="center">'
            . '<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.1);">'
            . '<tr><td style="background:#1d1d1d;padding:26px;text-align:center;"><h1 style="margin:0;color:#d4c1a0;font-size:24px;font-weight:300;letter-spacing:2px;">CLÍNICA CIALO</h1>'
            . '<p style="margin:5px 0 0;color:#cbcfd1;font-size:12px;letter-spacing:1px;">TRABAJA CON NOSOTROS</p></td></tr>'
            . '<tr><td style="padding:32px 30px;">'
            . '<h2 style="margin:0 0 20px;color:#1d1d1d;font-size:22px;">Nueva postulación</h2>'
            . '<table width="100%" style="font-size:14px;background:#f9f9f9;border-radius:8px;">' . $tr . '</table>'
            . $msgBlock
            . ($cvFilename ? '<p style="margin:20px 0 0;color:#666;font-size:13px;">📎 El CV va adjunto a este correo.</p>' : '')
            . '</td></tr></table></td></tr></table></body></html>';
    }

    private static function confirmTemplate(string $nombre): string
    {
        $n = self::esc($nombre);
        return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>'
            . '<body style="margin:0;padding:0;font-family:Segoe UI,Tahoma,sans-serif;background:#f5f5f5;">'
            . '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;"><tr><td align="center">'
            . '<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,.1);">'
            . '<tr><td style="background:#1d1d1d;padding:26px;text-align:center;"><h1 style="margin:0;color:#d4c1a0;font-size:24px;font-weight:300;letter-spacing:2px;">CLÍNICA CIALO</h1></td></tr>'
            . '<tr><td style="padding:34px 30px;">'
            . '<h2 style="margin:0 0 18px;color:#1d1d1d;font-size:22px;">¡Gracias por postular, ' . $n . '!</h2>'
            . '<p style="color:#666;font-size:15px;line-height:1.6;">Recibimos tu postulación y tu CV correctamente. Nuestro equipo revisará tu perfil y, si calza con una búsqueda vigente, te contactaremos.</p>'
            . '<p style="color:#666;font-size:15px;line-height:1.6;">Gracias por tu interés en ser parte de Clínica Cialo.</p>'
            . '<p style="color:#888;font-size:12px;margin-top:26px;">Este es un correo automático, por favor no respondas a este mensaje.</p>'
            . '</td></tr></table></td></tr></table></body></html>';
    }
}
