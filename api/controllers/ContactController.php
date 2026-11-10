<?php
// api/controllers/ContactController.php

namespace App\Controllers;

use App\Mailer;
use App\Database;
use App\Response;

class ContactController
{
    /**
     * Guardar el lead en la tabla contacts. Nunca lanza: si la BD falla,
     * el formulario igual responde (el correo es el respaldo).
     */
    private function persist(array $input): void
    {
        try {
            $db = Database::getInstance();
            $db->query(
                "INSERT INTO contacts (id, name, email, phone, subject, message, estado, utm_source, referrer, created_at)
                 VALUES (?, ?, ?, ?, ?, ?, 'nuevo', ?, ?, NOW())",
                [
                    Database::uuid(),
                    mb_substr(trim($input['name'] ?? ''), 0, 150),
                    mb_substr(trim($input['email'] ?? ''), 0, 150),
                    mb_substr(trim($input['phone'] ?? ''), 0, 50),
                    mb_substr(trim($input['subject'] ?? 'Consulta General'), 0, 200),
                    trim($input['message'] ?? ''),
                    mb_substr(trim($input['utm_source'] ?? ''), 0, 100) ?: null,
                    mb_substr(trim($input['referrer'] ?? ''), 0, 255) ?: null,
                ]
            );
        } catch (\Throwable $e) {
            error_log('Contact persist error: ' . $e->getMessage());
        }
    }

    /**
     * GET /contacts (admin) — listar leads
     */
    public function index(): void
    {
        $estado = $_GET['estado'] ?? null;
        $sql = "SELECT * FROM contacts";
        $params = [];
        if ($estado && in_array($estado, ['nuevo', 'respondido', 'cerrado'], true)) {
            $sql .= " WHERE estado = ?";
            $params[] = $estado;
        }
        $sql .= " ORDER BY created_at DESC LIMIT 500";
        Response::success(Database::getInstance()->fetchAll($sql, $params));
    }

    /**
     * PUT /contacts/{id} (admin) — actualizar estado del lead
     */
    public function update(string $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $estado = $data['estado'] ?? '';
        if (!in_array($estado, ['nuevo', 'respondido', 'cerrado'], true)) {
            Response::error('Estado inválido', 422);
        }
        $respondedAt = $estado === 'respondido' ? date('Y-m-d H:i:s') : null;
        Database::getInstance()->query(
            "UPDATE contacts SET estado = ?, responded_at = COALESCE(responded_at, ?) WHERE id = ?",
            [$estado, $respondedAt, $id]
        );
        Response::success(['id' => $id, 'estado' => $estado], 'Contacto actualizado');
    }
    /**
     * Handle contact form submission
     * POST /contact
     */
    public function submit(): void
    {
        header('Content-Type: application/json');
        
        // Get JSON input
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        $required = ['name', 'email', 'message'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => "El campo '$field' es requerido"
                ]);
                return;
            }
        }
        
        // Validate email format
        if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'El email no es válido'
            ]);
            return;
        }
        
        // Prepare contact data
        $contactData = [
            'name' => htmlspecialchars($input['name']),
            'email' => $input['email'],
            'phone' => htmlspecialchars($input['phone'] ?? 'No proporcionado'),
            'subject' => htmlspecialchars($input['subject'] ?? 'Consulta General'),
            'message' => htmlspecialchars($input['message']),
            'date' => date('d/m/Y H:i')
        ];
        
        // Persistir el lead antes de enviar correo (no bloquea ante fallo de BD)
        $this->persist($input);

        try {
            // Send notification to clinic
            $clinicSent = Mailer::sendContactNotification($contactData);

            // Pausa breve para evitar rate limiting del servidor de correo
            usleep(1500000);

            // Send confirmation to user
            $userSent = Mailer::sendContactConfirmation($contactData);
            
            if ($clinicSent) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.'
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    'success' => false,
                    'message' => 'Error al enviar el mensaje. Por favor, intenta nuevamente.'
                ]);
            }
        } catch (\Exception $e) {
            error_log("Contact form error: " . $e->getMessage());
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Error interno del servidor'
            ]);
        }
    }
}
