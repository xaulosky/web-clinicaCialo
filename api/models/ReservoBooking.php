<?php
// api/models/ReservoBooking.php
//
// Reserva de cita con abono: persiste los datos de la cita entre el inicio
// del pago Webpay y su confirmación, y guarda el resultado (cita creada).

namespace App\Models;

use App\Database;

class ReservoBooking
{
    private Database $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /** Genera una orden de compra única para Webpay (máx 26 chars). */
    public function nextBuyOrder(): string
    {
        // CITA + timestamp + 4 random  -> p.ej. CITA1717000000A1B2
        return 'CITA' . time() . strtoupper(substr(bin2hex(random_bytes(2)), 0, 4));
    }

    /**
     * Crea la reserva pendiente. $data ya validado por el controlador.
     */
    public function create(array $data): array
    {
        $id = Database::uuid();
        $this->db->query(
            "INSERT INTO reservo_bookings
                (id, buy_order, token, status, amount,
                 fecha, hora_inicio, hora_fin, servicio, profesional, tratamiento, tratamiento_nombre,
                 customer_name, customer_email, customer_phone, customer_rut, payload)
             VALUES (?, ?, ?, 'PENDIENTE', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $id,
                $data['buy_order'],
                $data['token'] ?? null,
                $data['amount'],
                $data['fecha'],
                $data['hora_inicio'],
                $data['hora_fin'],
                $data['servicio'],
                $data['profesional'] ?? null,
                $data['tratamiento'] ?? null,
                $data['tratamiento_nombre'] ?? null,
                $data['customer_name'],
                $data['customer_email'] ?? null,
                $data['customer_phone'] ?? null,
                $data['customer_rut'] ?? null,
                json_encode($data['payload'], JSON_UNESCAPED_UNICODE),
            ]
        );
        return $this->findById($id);
    }

    public function findById(string $id): ?array
    {
        return $this->db->fetch("SELECT * FROM reservo_bookings WHERE id = ?", [$id]);
    }

    public function findByToken(string $token): ?array
    {
        return $this->db->fetch("SELECT * FROM reservo_bookings WHERE token = ?", [$token]);
    }

    public function findByBuyOrder(string $buyOrder): ?array
    {
        return $this->db->fetch("SELECT * FROM reservo_bookings WHERE buy_order = ?", [$buyOrder]);
    }

    /**
     * ¿Ya existe una reserva viva (pagada o en curso) para esta misma hora con
     * este mismo profesional? Evita que dos personas —o la misma dos veces—
     * paguen el mismo hueco. Se mira por PROFESIONAL y no por box, porque un
     * box lo comparten varios profesionales y bloquear por box rechazaría
     * reservas legítimas.
     * Se considera "viva" una PENDIENTE reciente (pago en curso, ventana de
     * Webpay ~10 min) o cualquiera que ya haya sido cobrada.
     */
    public function slotOcupado(string $profesional, string $fecha, string $horaInicio, int $ventanaMin = 12): ?array
    {
        if ($profesional === '') return null;
        return $this->db->fetch(
            "SELECT * FROM reservo_bookings
              WHERE profesional = ? AND fecha = ? AND hora_inicio = ?
                AND (
                      status IN ('PAGADO', 'PAGADO_SIN_CITA')
                   OR (status = 'PENDIENTE' AND created_at > DATE_SUB(NOW(), INTERVAL ? MINUTE))
                )
              ORDER BY created_at DESC
              LIMIT 1",
            [$profesional, $fecha, $horaInicio, $ventanaMin]
        );
    }

    public function update(string $id, array $data): ?array
    {
        $allowed = [
            'token', 'status', 'cita_id', 'authorization_code',
            'amount_paid', 'paid_at', 'response_code', 'card_number', 'payment_status',
            'intentos_cita', 'last_error', 'alertado_at', 'resuelto_at', 'resuelto_nota',
        ];
        $fields = [];
        $values = [];
        foreach ($allowed as $f) {
            if (array_key_exists($f, $data)) {
                $fields[] = "$f = ?";
                $values[] = $data[$f];
            }
        }
        if (!$fields) return $this->findById($id);
        $values[] = $id;
        $this->db->query(
            "UPDATE reservo_bookings SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?",
            $values
        );
        return $this->findById($id);
    }

    /**
     * Marca el paso de PENDIENTE a un estado final SOLO si sigue PENDIENTE.
     * Devuelve true si esta llamada fue la que hizo la transición. Es la guardia
     * contra el doble retorno de Transbank (usuario que refresca, reintento de
     * la pasarela): quien pierde la carrera no vuelve a cobrar ni a agendar.
     */
    public function transicionarDesdePendiente(string $id, string $nuevoStatus): bool
    {
        $stmt = $this->db->query(
            "UPDATE reservo_bookings
                SET status = ?, updated_at = NOW()
              WHERE id = ? AND status = 'PENDIENTE'",
            [$nuevoStatus, $id]
        );
        return $stmt->rowCount() > 0;
    }

    /**
     * Listado para el panel de administración.
     * $filtros: status (string|array), desde, hasta (YYYY-MM-DD sobre created_at), q (texto libre).
     */
    public function listar(array $filtros = [], int $limit = 200, int $offset = 0): array
    {
        $where = [];
        $params = [];

        if (!empty($filtros['status'])) {
            $estados = (array) $filtros['status'];
            $where[] = 'status IN (' . implode(',', array_fill(0, count($estados), '?')) . ')';
            foreach ($estados as $e) $params[] = $e;
        }
        if (!empty($filtros['desde'])) {
            $where[] = 'created_at >= ?';
            $params[] = $filtros['desde'] . ' 00:00:00';
        }
        if (!empty($filtros['hasta'])) {
            $where[] = 'created_at <= ?';
            $params[] = $filtros['hasta'] . ' 23:59:59';
        }
        if (!empty($filtros['q'])) {
            $where[] = '(customer_name LIKE ? OR customer_email LIKE ? OR customer_rut LIKE ? OR buy_order LIKE ? OR cita_id LIKE ?)';
            $like = '%' . $filtros['q'] . '%';
            for ($i = 0; $i < 5; $i++) $params[] = $like;
        }

        $sql = 'SELECT * FROM reservo_bookings';
        if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
        $sql .= ' ORDER BY created_at DESC LIMIT ' . (int) $limit . ' OFFSET ' . (int) $offset;

        return $this->db->fetchAll($sql, $params);
    }

    /** Conteo y montos por estado, para las tarjetas del panel. */
    public function resumen(array $filtros = []): array
    {
        $where = [];
        $params = [];
        if (!empty($filtros['desde'])) { $where[] = 'created_at >= ?'; $params[] = $filtros['desde'] . ' 00:00:00'; }
        if (!empty($filtros['hasta'])) { $where[] = 'created_at <= ?'; $params[] = $filtros['hasta'] . ' 23:59:59'; }

        $sql = 'SELECT status, COUNT(*) AS n, COALESCE(SUM(amount), 0) AS monto FROM reservo_bookings';
        if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
        $sql .= ' GROUP BY status';

        return $this->db->fetchAll($sql, $params);
    }

    /**
     * Reservas cobradas cuya cita no existe. Es la bandeja de trabajo de la
     * clínica: cada fila es plata recibida por un servicio aún no agendado.
     */
    public function pagadasSinCita(): array
    {
        return $this->db->fetchAll(
            "SELECT * FROM reservo_bookings
              WHERE status = 'PAGADO_SIN_CITA' AND resuelto_at IS NULL
              ORDER BY created_at DESC"
        );
    }

    /**
     * Cierra las reservas PENDIENTE que quedaron colgadas (el usuario nunca
     * volvió de Webpay). Sin esto la tabla acumula ruido para siempre y el
     * embudo de conversión miente.
     */
    public function cerrarAbandonadas(int $horas = 2): int
    {
        $stmt = $this->db->query(
            "UPDATE reservo_bookings
                SET status = 'ABANDONADO', updated_at = NOW()
              WHERE status = 'PENDIENTE'
                AND created_at < DATE_SUB(NOW(), INTERVAL ? HOUR)",
            [$horas]
        );
        return $stmt->rowCount();
    }
}
