<?php
// api/controllers/ReservoBookingsAdminController.php
//
// Administración de las reservas de hora cobradas por Webpay.
//
// Existía el cobro y la tabla, pero ninguna forma de mirarlos: la clínica no
// tenía manera de saber quién había pagado, ni de encontrar los cobros cuya
// cita no se llegó a crear. Todo lo de aquí es solo para administradores.
//
//   GET  /reservo/bookings                  listado con filtros
//   GET  /reservo/bookings/resumen          conteos y montos por estado
//   POST /reservo/bookings/{id}/reintentar  vuelve a crear la cita de un cobro sin cita
//   POST /reservo/bookings/{id}/resolver    marca como gestionada a mano

namespace App\Controllers;

use App\Response;
use App\Models\ReservoBooking;

class ReservoBookingsAdminController
{
    private ReservoBooking $bookings;

    public function __construct()
    {
        $this->bookings = new ReservoBooking();
    }

    /** Nunca se devuelve el payload crudo: lleva datos personales que la lista no necesita. */
    private static function fila(array $b): array
    {
        return [
            'id'                 => $b['id'],
            'buy_order'          => $b['buy_order'],
            'status'             => $b['status'],
            'amount'             => (int) $b['amount'],
            'amount_paid'        => isset($b['amount_paid']) ? (int) $b['amount_paid'] : null,
            'fecha'              => $b['fecha'],
            'hora_inicio'        => $b['hora_inicio'],
            'hora_fin'           => $b['hora_fin'],
            'servicio'           => $b['servicio'],
            'profesional'        => $b['profesional'] ?? null,
            'tratamiento'        => $b['tratamiento'],
            'tratamiento_nombre' => $b['tratamiento_nombre'],
            'customer_name'      => $b['customer_name'],
            'customer_email'     => $b['customer_email'],
            'customer_phone'     => $b['customer_phone'],
            'customer_rut'       => $b['customer_rut'],
            'cita_id'            => $b['cita_id'],
            'authorization_code' => $b['authorization_code'],
            'card_number'        => $b['card_number'] ?? null,
            'response_code'      => isset($b['response_code']) ? (int) $b['response_code'] : null,
            'intentos_cita'      => (int) ($b['intentos_cita'] ?? 0),
            'last_error'         => $b['last_error'] ?? null,
            'paid_at'            => $b['paid_at'] ?? null,
            'resuelto_at'        => $b['resuelto_at'] ?? null,
            'resuelto_nota'      => $b['resuelto_nota'] ?? null,
            'created_at'         => $b['created_at'],
            'updated_at'         => $b['updated_at'],
        ];
    }

    /** GET /reservo/bookings?status=&desde=&hasta=&q=&limit=&offset= */
    public function index(): void
    {
        $filtros = [
            'desde' => $_GET['desde'] ?? null,
            'hasta' => $_GET['hasta'] ?? null,
            'q'     => isset($_GET['q']) ? trim((string) $_GET['q']) : null,
        ];

        if (!empty($_GET['status'])) {
            $filtros['status'] = array_values(array_filter(
                array_map('trim', explode(',', (string) $_GET['status']))
            ));
        }

        $limit  = max(1, min(500, (int) ($_GET['limit'] ?? 200)));
        $offset = max(0, (int) ($_GET['offset'] ?? 0));

        try {
            $rows = $this->bookings->listar($filtros, $limit, $offset);
            Response::success(array_map([self::class, 'fila'], $rows));
        } catch (\Throwable $e) {
            error_log('[ReservoBookingsAdmin index] ' . $e->getMessage());
            Response::serverError('No se pudo obtener el listado de reservas.');
        }
    }

    /** GET /reservo/bookings/resumen?desde=&hasta= */
    public function resumen(): void
    {
        try {
            $porEstado = $this->bookings->resumen([
                'desde' => $_GET['desde'] ?? null,
                'hasta' => $_GET['hasta'] ?? null,
            ]);

            $mapa = [];
            foreach ($porEstado as $r) {
                $mapa[$r['status']] = ['n' => (int) $r['n'], 'monto' => (int) $r['monto']];
            }

            $pendientesDeGestion = $this->bookings->pagadasSinCita();

            Response::success([
                'por_estado'            => $mapa,
                'cobrado'               => ($mapa['PAGADO']['monto'] ?? 0) + ($mapa['PAGADO_SIN_CITA']['monto'] ?? 0),
                'pagadas_sin_cita'      => count($pendientesDeGestion),
                'monto_sin_cita'        => array_sum(array_map(static fn($b) => (int) ($b['amount_paid'] ?: $b['amount']), $pendientesDeGestion)),
            ]);
        } catch (\Throwable $e) {
            error_log('[ReservoBookingsAdmin resumen] ' . $e->getMessage());
            Response::serverError('No se pudo obtener el resumen de reservas.');
        }
    }

    /**
     * POST /reservo/bookings/{id}/reintentar
     * Vuelve a intentar crear en reservo.cl la cita de un cobro que quedó sin
     * ella. Es la acción que convierte un PAGADO_SIN_CITA en una cita real sin
     * tener que copiar los datos a mano.
     */
    public function reintentar(string $id): void
    {
        $b = $this->bookings->findById($id);
        if (!$b) {
            Response::notFound('Reserva no encontrada.');
        }
        if ($b['status'] !== 'PAGADO_SIN_CITA') {
            Response::error('Solo se puede reintentar una reserva cobrada sin cita (estado actual: ' . $b['status'] . ').', 409);
        }
        if (!empty($b['cita_id'])) {
            Response::error('Esta reserva ya tiene una cita asociada (' . $b['cita_id'] . ').', 409);
        }

        $payload = json_decode((string) $b['payload'], true) ?: [];
        if (!$payload) {
            Response::error('La reserva no tiene datos suficientes para reagendar.', 422);
        }

        try {
            $booking = new ReservoBookingController();
            [$citaId, $error, $intentos] = $booking->crearCitaConReintentos($payload);

            if (!$citaId) {
                $this->bookings->update($id, [
                    'intentos_cita' => (int) $b['intentos_cita'] + $intentos,
                    'last_error'    => mb_substr((string) $error, 0, 500),
                ]);
                Response::error('No se pudo crear la cita: ' . $error, 502);
            }

            $actualizada = $this->bookings->update($id, [
                'status'        => 'PAGADO',
                'cita_id'       => $citaId,
                'intentos_cita' => (int) $b['intentos_cita'] + $intentos,
                'last_error'    => null,
                'resuelto_at'   => date('Y-m-d H:i:s'),
                'resuelto_nota' => 'Cita creada desde el panel de administración.',
            ]);

            $booking->avisarPacienteCitaConfirmada($actualizada);

            Response::success(self::fila($actualizada), 'Cita creada correctamente.');
        } catch (\Throwable $e) {
            error_log('[ReservoBookingsAdmin reintentar] ' . $e->getMessage());
            Response::serverError('Error al reintentar la cita: ' . $e->getMessage());
        }
    }

    /**
     * POST /reservo/bookings/{id}/resolver
     * Body: { nota }
     * Para cuando se gestionó fuera del sistema (se agendó por teléfono, se
     * devolvió el dinero). Deja constancia de qué se hizo y saca la fila de la
     * bandeja de pendientes.
     */
    public function resolver(string $id): void
    {
        $b = $this->bookings->findById($id);
        if (!$b) {
            Response::notFound('Reserva no encontrada.');
        }

        $in = json_decode(file_get_contents('php://input'), true) ?: [];
        $nota = trim((string) ($in['nota'] ?? ''));
        if ($nota === '') {
            Response::error('Indica qué se hizo con esta reserva.', 422);
        }

        try {
            $actualizada = $this->bookings->update($id, [
                'resuelto_at'   => date('Y-m-d H:i:s'),
                'resuelto_nota' => mb_substr($nota, 0, 500),
            ]);
            Response::success(self::fila($actualizada), 'Reserva marcada como gestionada.');
        } catch (\Throwable $e) {
            error_log('[ReservoBookingsAdmin resolver] ' . $e->getMessage());
            Response::serverError('No se pudo actualizar la reserva.');
        }
    }
}
