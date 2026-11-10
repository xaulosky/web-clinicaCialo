<?php
// api/controllers/GiftCardController.php

namespace App\Controllers;

use App\Mailer;
use App\Database;
use App\Response;

class GiftCardController
{
    /**
     * Persiste una gift card en BD. Nunca lanza (no debe bloquear el flujo de pago/correo).
     */
    private function persist(array $gift, ?string $orderId, string $estado): void
    {
        try {
            $codigo = trim($gift['codigo'] ?? '');
            if ($codigo === '') {
                $codigo = 'GC-' . strtoupper(substr(Database::uuid(), 0, 8));
            }
            // Vencimiento: aceptar YYYY-MM-DD o convertir; si no, NULL
            $venc = null;
            $rawVenc = trim($gift['vencimiento'] ?? '');
            if ($rawVenc !== '') {
                $ts = strtotime($rawVenc);
                if ($ts) $venc = date('Y-m-d', $ts);
            }
            $monto = (int) ($gift['monto'] ?? 0);
            Database::getInstance()->query(
                "INSERT INTO gift_cards
                    (id, codigo, tipo, monto, tratamiento, saldo, estado, order_id,
                     comprador_nombre, comprador_email, comprador_telefono, destinatario, mensaje, vencimiento, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
                [
                    Database::uuid(),
                    mb_substr($codigo, 0, 20),
                    ($gift['tipo'] ?? 'valor') === 'tratamiento' ? 'tratamiento' : 'valor',
                    $monto,
                    mb_substr($gift['tratamiento'] ?? '', 0, 150) ?: null,
                    $monto,
                    $estado,
                    $orderId,
                    mb_substr($gift['comprador']['nombre'] ?? '', 0, 150) ?: null,
                    mb_substr($gift['comprador']['email'] ?? '', 0, 150) ?: null,
                    mb_substr($gift['comprador']['telefono'] ?? '', 0, 50) ?: null,
                    mb_substr($gift['destinatario'] ?? '', 0, 150) ?: null,
                    $gift['mensaje'] ?? null,
                    $venc,
                ]
            );
        } catch (\Throwable $e) {
            error_log('GiftCard persist error: ' . $e->getMessage());
        }
    }

    /**
     * GET /giftcards (admin) — listar gift cards vendidas
     */
    public function index(): void
    {
        $estado = $_GET['estado'] ?? null;
        $sql = "SELECT id, codigo, tipo, monto, tratamiento, saldo, estado, order_id,
                       comprador_nombre, comprador_email, destinatario, vencimiento, redeemed_at, created_at
                FROM gift_cards";
        $params = [];
        if ($estado) {
            $sql .= " WHERE estado = ?";
            $params[] = $estado;
        }
        $sql .= " ORDER BY created_at DESC LIMIT 500";
        Response::success(Database::getInstance()->fetchAll($sql, $params));
    }
    /**
     * Valida y sanea el payload de una Gift Card. Devuelve [gift, error].
     */
    private function buildGift(array $input): array
    {
        $comprador = $input['comprador'] ?? [];
        foreach (['nombre', 'email', 'telefono'] as $f) {
            if (empty($comprador[$f])) {
                return [null, "Falta el campo del comprador: '$f'"];
            }
        }
        if (!filter_var($comprador['email'], FILTER_VALIDATE_EMAIL)) {
            return [null, 'El email del comprador no es válido'];
        }

        $tipo = ($input['tipo'] ?? 'valor') === 'tratamiento' ? 'tratamiento' : 'valor';
        $monto = (int) ($input['monto'] ?? 0);
        if ($monto <= 0) {
            return [null, 'Monto de la Gift Card inválido'];
        }

        return [[
            'tipo'         => $tipo,
            'monto'        => $monto,
            'tratamiento'  => htmlspecialchars($input['tratamiento'] ?? ''),
            'codigo'       => htmlspecialchars($input['codigo'] ?? ''),
            'destinatario' => htmlspecialchars($input['destinatario'] ?? ''),
            'remitente'    => htmlspecialchars($input['remitente'] ?? ''),
            'mensaje'      => htmlspecialchars($input['mensaje'] ?? ''),
            'vencimiento'  => htmlspecialchars($input['vencimiento'] ?? ''),
            'estilo'       => htmlspecialchars($input['estilo'] ?? ''),
            'imagen'       => is_string($input['imagen'] ?? null) ? $input['imagen'] : '',
            'modo'         => ($input['modo'] ?? 'prueba'),
            'comprador'    => [
                'nombre'   => htmlspecialchars($comprador['nombre']),
                'email'    => $comprador['email'],
                'telefono' => htmlspecialchars($comprador['telefono']),
            ],
            'fecha'        => date('d/m/Y H:i'),
        ], null];
    }

    /**
     * Guarda una Gift Card pendiente asociada a una orden (se envía al confirmar el pago Webpay).
     * POST /giftcard/prepare  — body: { order_id, ...datos giftcard }
     */
    public function prepare(): void
    {
        header('Content-Type: application/json');

        $input = json_decode(file_get_contents('php://input'), true) ?? [];
        $orderId = preg_replace('/[^A-Za-z0-9_-]/', '', (string) ($input['order_id'] ?? ''));
        if ($orderId === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Falta order_id']);
            return;
        }

        [$gift, $error] = $this->buildGift($input);
        if ($error) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => $error]);
            return;
        }

        $dir = __DIR__ . '/../storage/giftcards';
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }
        $ok = @file_put_contents("$dir/$orderId.json", json_encode($gift)) !== false;

        if ($ok) {
            echo json_encode(['success' => true, 'message' => 'Gift Card preparada, pendiente de pago.']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'No se pudo guardar la Gift Card.']);
        }
    }

    /**
     * Recibe una compra/creación de Gift Card hecha por el usuario.
     * POST /giftcard
     *
     * Modo prueba (sin Webpay): notifica a la clínica con todos los datos y
     * envía confirmación al comprador. No procesa pago.
     */
    public function submit(): void
    {
        header('Content-Type: application/json');

        $input = json_decode(file_get_contents('php://input'), true) ?? [];

        // Validación mínima del comprador
        $comprador = $input['comprador'] ?? [];
        foreach (['nombre', 'email', 'telefono'] as $f) {
            if (empty($comprador[$f])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => "Falta el campo del comprador: '$f'"]);
                return;
            }
        }
        if (!filter_var($comprador['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'El email del comprador no es válido']);
            return;
        }

        $tipo = ($input['tipo'] ?? 'valor') === 'tratamiento' ? 'tratamiento' : 'valor';
        $monto = (int) ($input['monto'] ?? 0);

        if ($tipo === 'valor' && $monto <= 0) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Monto de la Gift Card inválido']);
            return;
        }

        $gift = [
            'tipo'         => $tipo,
            'monto'        => $monto,
            'tratamiento'  => htmlspecialchars($input['tratamiento'] ?? ''),
            'codigo'       => htmlspecialchars($input['codigo'] ?? ''),
            'destinatario' => htmlspecialchars($input['destinatario'] ?? ''),
            'remitente'    => htmlspecialchars($input['remitente'] ?? ''),
            'mensaje'      => htmlspecialchars($input['mensaje'] ?? ''),
            'vencimiento'  => htmlspecialchars($input['vencimiento'] ?? ''),
            'estilo'       => htmlspecialchars($input['estilo'] ?? ''),
            'imagen'       => is_string($input['imagen'] ?? null) ? $input['imagen'] : '', // data URL PNG (sin escapar)
            'modo'         => ($input['modo'] ?? 'prueba'),
            'comprador'    => [
                'nombre'   => htmlspecialchars($comprador['nombre']),
                'email'    => $comprador['email'],
                'telefono' => htmlspecialchars($comprador['telefono']),
            ],
            'fecha'        => date('d/m/Y H:i'),
        ];

        try {
            $clinicSent = Mailer::sendGiftCardNotification($gift);
            Mailer::sendGiftCardConfirmation($gift);

            if ($clinicSent) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Gift Card registrada. Te enviamos los detalles por correo.',
                    'codigo'  => $gift['codigo'],
                ]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'message' => 'No se pudo registrar la Gift Card. Intenta nuevamente.']);
            }
        } catch (\Exception $e) {
            error_log('GiftCard error: ' . $e->getMessage());
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error interno del servidor']);
        }
    }
}
