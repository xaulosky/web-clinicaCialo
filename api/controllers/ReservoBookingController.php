<?php
// api/controllers/ReservoBookingController.php
//
// Flujo de pago del abono (Webpay Plus) + creación de la cita en reservo.cl.
//   POST /reservo/pago/init     -> inicia el pago, guarda la reserva pendiente
//   GET|POST /reservo/pago/confirm -> return de Transbank; al aprobar, crea la cita
//
// Aislado del checkout de productos (TransbankController) para no afectarlo.
//
// Invariantes que este controlador debe sostener (dinero real de por medio):
//   1. Nunca se cobra dos veces por la misma reserva: confirm() es idempotente
//      y un retorno repetido de Transbank no vuelve a commitear ni a agendar.
//   2. Nunca se pisa un estado final: un TBK_TOKEN tardío no puede dejar en
//      CANCELADO una reserva ya cobrada y agendada.
//   3. Todo cobro queda registrado ANTES de intentar crear la cita, para que
//      ningún fallo posterior borre el rastro del dinero.
//   4. Un cobro cuya cita no se pudo crear termina en PAGADO_SIN_CITA y con un
//      correo a la clínica. Jamás se pierde en silencio.

namespace App\Controllers;

use App\Reservo;
use App\ReservoBoxes;
use App\Response;
use App\Mailer;
use App\Models\ReservoBooking;
use Transbank\Webpay\WebpayPlus\Transaction;
use Transbank\Webpay\Options;

class ReservoBookingController
{
    /** Intentos de creación de la cita tras un pago aprobado. */
    private const MAX_INTENTOS_CITA = 3;

    /** Pausa entre intentos (segundos). Corta: el paciente espera el redirect. */
    private const PAUSA_REINTENTO = 1;

    private array $config;
    private ReservoBooking $bookings;

    public function __construct()
    {
        $this->config = require __DIR__ . '/../config/config.php';
        // Boxes: base deployable (ReservoBoxes) + overrides del config del server.
        $this->config['reservo']['agendas'] = ReservoBoxes::merge($this->config['reservo']['agendas'] ?? []);
        $this->bookings = new ReservoBooking();
    }

    private function createTransaction(): Transaction
    {
        if (($this->config['transbank']['environment'] ?? '') === 'production') {
            $options = new Options(
                trim($this->config['transbank']['api_key']),
                trim($this->config['transbank']['commerce_code']),
                Options::ENVIRONMENT_PRODUCTION
            );
            return new Transaction($options);
        }
        return new Transaction(); // integración
    }

    /**
     * Resuelve el box interno para (token, profesional, tratamiento) según la
     * config 'reservo.agendas'. Orden: override por tratamiento -> default por
     * profesional. Devuelve null si no hay box configurado (no se adivina).
     */
    private function resolveBox(string $token, string $profesional, string $tratamientoId): ?string
    {
        $a = $this->config['reservo']['agendas'][$token] ?? [];
        $porTrat = $a['box_por_tratamiento'] ?? [];
        if ($tratamientoId !== '' && !empty($porTrat[$tratamientoId])) {
            return (string) $porTrat[$tratamientoId];
        }
        $porProf = $a['box_por_profesional'] ?? [];
        return !empty($porProf[$profesional]) ? (string) $porProf[$profesional] : null;
    }

    /**
     * ¿El servicio es una CONSULTA/EVALUACIÓN (se paga completa al reservar) o
     * un TRATAMIENTO (se reserva con abono)? Se decide por el nombre real del
     * servicio en reservo, no por lo que diga el cliente.
     */
    private static function esConsulta(string $nombre): bool
    {
        $n = mb_strtolower(trim($nombre));
        $n = strtr($n, ['á' => 'a', 'é' => 'e', 'í' => 'i', 'ó' => 'o', 'ú' => 'u']);
        return (bool) preg_match('/^(consulta|evaluacion|control)\b/', $n);
    }

    /**
     * ¿El slot (fecha YYYY-MM-DD + hora HH:mm) cae en la franja gratuita de la
     * evaluación del Dr. Nicolás? Autoridad del servidor: no confía en el cliente.
     */
    private function isFreeEvalSlot(string $fecha, string $horaInicio): bool
    {
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) return false;
        $ts = strtotime($fecha);
        if ($ts === false) return false;
        $diaIso = (int) date('N', $ts); // 1=Lun .. 7=Dom
        $hora   = substr((string) $horaInicio, 0, 5);
        $dias   = $this->config['reservo']['eval_free_dias'] ?? [1, 2, 4, 5];
        $horas  = $this->config['reservo']['eval_free_horas'] ?? ['09:00', '12:00', '15:00'];
        return in_array($diaIso, $dias, true) && in_array($hora, $horas, true);
    }

    /**
     * Busca un servicio en la agenda pública de reservo. Devuelve null si no se
     * pudo consultar (deja que el llamante decida si abrir o cerrar la puerta).
     */
    private function servicioDeAgenda(string $token, string $tratamientoId): ?array
    {
        if ($tratamientoId === '') return null;
        try {
            $reservo = new Reservo($this->config['reservo'] ?? []);
            $pub = $reservo->getAgendaPublica($token);
            foreach ($pub['tratamientos'] ?? [] as $svc) {
                if ((string) ($svc['id'] ?? '') === $tratamientoId) return $svc;
            }
        } catch (\Throwable $e) {
            error_log('[ReservoBooking] no se pudo leer la agenda pública: ' . $e->getMessage());
        }
        return null;
    }

    /** Entero desde un valor formateado de reservo ("40.000" -> 40000). */
    private static function clp($v): int
    {
        return (int) preg_replace('/\D/', '', (string) $v);
    }

    /**
     * POST /reservo/pago/init
     * Body JSON: { token, profesional, tratamiento, tratamiento_nombre,
     *              fecha, horaInicio, horaFin,
     *              name, app_paterno, app_materno, rut, mail, phone, comentario, eval }
     * El box se resuelve en el servidor a partir de (token, profesional, tratamiento).
     */
    public function init(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        $in = json_decode(file_get_contents('php://input'), true) ?: [];

        // Validación mínima
        foreach (['token', 'profesional', 'fecha', 'horaInicio', 'horaFin', 'name'] as $req) {
            if (empty($in[$req])) {
                http_response_code(400);
                echo json_encode(['error' => "Falta el campo '$req'."], JSON_UNESCAPED_UNICODE);
                return;
            }
        }
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $in['fecha'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Fecha inválida (use YYYY-MM-DD).'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $token         = (string) $in['token'];
        $profesional   = (string) $in['profesional'];
        $tratamientoId = isset($in['tratamiento']) ? (string) $in['tratamiento'] : '';

        // Cierra las PENDIENTE que quedaron colgadas (el paciente nunca volvió de
        // Webpay). Sin esto se acumulan para siempre y el embudo de conversión
        // miente. Se hace aquí para no depender de un cron en el hosting.
        try {
            $this->bookings->cerrarAbandonadas(2);
        } catch (\Throwable $e) {
            error_log('[ReservoBooking init] no se pudieron cerrar las abandonadas: ' . $e->getMessage());
        }

        $box = $this->resolveBox($token, $profesional, $tratamientoId);
        if ($box === null) {
            http_response_code(409);
            echo json_encode([
                'error' => 'Esta agenda aún no está habilitada para reserva online (box no configurado).',
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // El mismo hueco no se vende dos veces. Cubre el doble clic del propio
        // paciente y la carrera entre dos personas mirando el mismo horario:
        // sin esto, el segundo paga y después descubre que no hay cita.
        $ocupado = $this->bookings->slotOcupado($profesional, $in['fecha'], substr((string) $in['horaInicio'], 0, 5));
        if ($ocupado) {
            http_response_code(409);
            echo json_encode([
                'error'   => 'Ese horario acaba de ser tomado. Elige otro, por favor.',
                'ocupado' => true,
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Nombre REAL del servicio según reservo (el del cliente es solo una
        // etiqueta y no debe decidir cuánto se cobra ni qué dice el comprobante).
        $svc = $this->servicioDeAgenda($token, $tratamientoId);
        $nombreServicio = $svc['nombre'] ?? ($in['tratamiento_nombre'] ?? null);

        // Fail-CLOSED: si se pidió un servicio concreto y no se pudo verificar
        // contra la agenda pública, no se inventa el precio. Antes se caía al
        // abono plano de $20.000, de modo que una consulta de $50.000 que la web
        // acababa de anunciar como "pago total" se cobraba a $20.000. Mismo
        // criterio que ya usa /reservo/eval-gratis.
        if ($tratamientoId !== '' && $svc === null) {
            http_response_code(409);
            echo json_encode([
                'error'         => 'No pudimos verificar el valor de este servicio. Reintenta en unos segundos.',
                'no_verificado' => true,
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Evaluación del Dr. Nicolás: si la regla aplica, el monto es $30.000.
        // Un slot gratuito NO debe pasar por pago: se rechaza para que el cliente
        // use /reservo/eval-gratis (evita cobrar una evaluación que es gratis).
        // La franja SOLO aplica a las agendas de EVAL_TOKENS.
        $isEval = !empty($in['eval']) && in_array($token, ReservoBoxes::EVAL_TOKENS, true);
        $tipoCobro = 'abono';

        if ($isEval) {
            if ($this->isFreeEvalSlot($in['fecha'], $in['horaInicio'])) {
                http_response_code(409);
                echo json_encode([
                    'error' => 'Este horario de evaluación es gratuito; no requiere pago.',
                    'free'  => true,
                ], JSON_UNESCAPED_UNICODE);
                return;
            }
            $amount = (int) ($this->config['reservo']['eval_precio'] ?? 30000);
            $tipoCobro = 'total';
        } else {
            // Monto según el tipo de servicio (valor leído de la agenda pública
            // de reservo: autoridad del servidor, nunca del cliente):
            //  - CONSULTAS y EVALUACIONES: se pagan COMPLETAS al reservar.
            //  - TRATAMIENTOS: se reservan con abono, que nunca puede superar
            //    el valor del servicio (p.ej. examen InBody $15.000).
            // Si no se puede leer el valor, se usa el abono plano.
            $amount = (int) ($this->config['reservo']['abono'] ?? 20000);

            if ($svc !== null) {
                $valor = self::clp($svc['valor'] ?? '');
                if (self::esConsulta((string) ($svc['nombre'] ?? ''))) {
                    $tipoCobro = 'total';
                    if ($valor > 0) $amount = $valor;
                } else {
                    // Si reservo declara un abono propio para el tratamiento, manda
                    // ese: es el que la clínica configuró para ese servicio.
                    $abonoReservo = !empty($svc['usa_abono']) ? self::clp($svc['monto_abono'] ?? '') : 0;
                    if ($abonoReservo > 0) {
                        $amount = $abonoReservo;
                    }
                    if ($valor > 0) $amount = min($amount, $valor);
                }
            }
        }

        if ($amount <= 0) {
            http_response_code(409);
            echo json_encode([
                'error' => 'Este servicio no requiere pago. Reintenta la reserva.',
                'free'  => true,
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Payload base para reservo (el comentario del abono se agrega al confirmar).
        // `_tipo_cobro` lo decide el SERVIDOR aquí y confirm() lo reutiliza, para
        // que la etiqueta del comprobante no dependa del nombre que mandó el cliente.
        $payload = [
            'fecha'         => $in['fecha'],
            'horaInicio'    => $in['horaInicio'],
            'horaFin'       => $in['horaFin'],
            'servicio'      => $box,            // box interno (sucursal/agenda)
            'profesionales' => $profesional,    // profesional asignado
            'tratamientos'  => $tratamientoId,
            'name'          => $in['name'],
            'app_paterno'   => $in['app_paterno'] ?? '',
            'app_materno'   => $in['app_materno'] ?? '',
            'rut'           => $in['rut'] ?? '',
            'mail'          => $in['mail'] ?? '',
            'phone_1'       => $in['phone'] ?? '',
            'phone'         => $in['phone'] ?? '',
            'comentario'    => $in['comentario'] ?? '',
            'registrar'     => true,   // guarda el cliente en reservo
            'sendmail'      => false,
            '_tipo_cobro'   => $tipoCobro,
        ];

        try {
            $buyOrder  = $this->bookings->nextBuyOrder();
            $sessionId = 'CITA-' . substr(md5($buyOrder), 0, 10);
            $returnUrl = rtrim($this->config['app']['api_url'], '/') . '/reservo/pago/confirm';

            $tx = $this->createTransaction();
            $resp = $tx->create($buyOrder, $sessionId, $amount, $returnUrl);

            $this->bookings->create([
                'buy_order'          => $buyOrder,
                'token'              => $resp->getToken(),
                'amount'             => $amount,
                'fecha'              => $in['fecha'],
                'hora_inicio'        => $in['horaInicio'],
                'hora_fin'           => $in['horaFin'],
                'servicio'           => $box,
                'profesional'        => $profesional,
                'tratamiento'        => $tratamientoId !== '' ? $tratamientoId : null,
                'tratamiento_nombre' => $nombreServicio,
                'customer_name'      => trim($in['name'] . ' ' . ($in['app_paterno'] ?? '')),
                'customer_email'     => $in['mail'] ?? null,
                'customer_phone'     => $in['phone'] ?? null,
                'customer_rut'       => $in['rut'] ?? null,
                'payload'            => $payload,
            ]);

            echo json_encode([
                'token' => $resp->getToken(),
                'url'   => $resp->getUrl(),
                'abono' => $amount,
                'tipo'  => $tipoCobro,
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            error_log('[ReservoBooking init] ' . $e->getMessage());
            http_response_code(502);
            echo json_encode(['error' => 'No se pudo iniciar el pago.'], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * POST /reservo/eval-gratis
     * Agenda la evaluación gratuita del Dr. Nicolás SIN pago. El servidor valida
     * que el slot caiga realmente en la franja gratuita (L-Ma-J-V 09/12/15);
     * cualquier otro horario se rechaza para que pase por pago.
     * Body JSON: { token, profesional, tratamiento, tratamiento_nombre,
     *              fecha, horaInicio, horaFin,
     *              name, app_paterno, app_materno, rut, mail, phone }
     */
    public function agendarEvalGratis(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        $in = json_decode(file_get_contents('php://input'), true) ?: [];

        foreach (['token', 'profesional', 'fecha', 'horaInicio', 'horaFin', 'name'] as $req) {
            if (empty($in[$req])) {
                http_response_code(400);
                echo json_encode(['ok' => false, 'error' => "Falta el campo '$req'."], JSON_UNESCAPED_UNICODE);
                return;
            }
        }
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $in['fecha'])) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Fecha inválida (use YYYY-MM-DD).'], JSON_UNESCAPED_UNICODE);
            return;
        }

        $token         = (string) $in['token'];
        $profesional   = (string) $in['profesional'];
        $tratamientoId = isset($in['tratamiento']) ? (string) $in['tratamiento'] : '';

        // Dos formas legítimas de agendar GRATIS (el servidor decide, nunca el cliente):
        //  a) Agenda de evaluación (EVAL_TOKENS, Dr. Laucirica): slot en la franja
        //     gratuita; si además viene un tratamiento, debe ser gratuito.
        //  b) Cualquier otra agenda habilitada: SOLO con un tratamiento cuyo valor
        //     verificado en la agenda pública sea $0 (p.ej. evaluación corporal),
        //     en cualquier horario.
        $esEvalToken = in_array($token, ReservoBoxes::EVAL_TOKENS, true);
        if ($esEvalToken) {
            if (!$this->isFreeEvalSlot($in['fecha'], $in['horaInicio'])) {
                http_response_code(409);
                echo json_encode([
                    'ok'            => false,
                    'error'         => 'Este horario no es de evaluación gratuita. Requiere pago.',
                    'requiere_pago' => true,
                ], JSON_UNESCAPED_UNICODE);
                return;
            }
        } elseif ($tratamientoId === '') {
            http_response_code(409);
            echo json_encode([
                'ok'            => false,
                'error'         => 'Esta agenda no tiene evaluación gratuita. Requiere pago.',
                'requiere_pago' => true,
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // GUARDIA: si viene un tratamiento, debe ser GRATUITO en la agenda pública
        // (autoridad del servidor). Sin esto, un tratamiento pagado del mismo token
        // (p.ej. CoolPeel en la agenda del Dr. Laucirica) podría agendarse gratis.
        // Fail-CLOSED: si no se puede verificar, se rechaza.
        $nombreServicio = $in['tratamiento_nombre'] ?? 'Evaluación gratuita';
        if ($tratamientoId !== '') {
            $svc = $this->servicioDeAgenda($token, $tratamientoId);
            $esGratis = $svc !== null && self::clp($svc['valor'] ?? '') === 0;
            if (!$esGratis) {
                http_response_code(409);
                echo json_encode([
                    'ok'            => false,
                    'error'         => 'Este servicio requiere pago.',
                    'requiere_pago' => true,
                ], JSON_UNESCAPED_UNICODE);
                return;
            }
            $nombreServicio = $svc['nombre'] ?? $nombreServicio;
        }

        $box = $this->resolveBox($token, $profesional, $tratamientoId);
        if ($box === null) {
            http_response_code(409);
            echo json_encode([
                'ok'    => false,
                'error' => 'Esta agenda aún no está habilitada para reserva online (box no configurado).',
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        // Mismo candado de hueco que en el flujo pagado.
        if ($this->bookings->slotOcupado($profesional, $in['fecha'], substr((string) $in['horaInicio'], 0, 5))) {
            http_response_code(409);
            echo json_encode([
                'ok'      => false,
                'error'   => 'Ese horario acaba de ser tomado. Elige otro, por favor.',
                'ocupado' => true,
            ], JSON_UNESCAPED_UNICODE);
            return;
        }

        $payload = [
            'fecha'         => $in['fecha'],
            'horaInicio'    => $in['horaInicio'],
            'horaFin'       => $in['horaFin'],
            'servicio'      => $box,
            'profesionales' => $profesional,
            'tratamientos'  => $tratamientoId,
            'name'          => $in['name'],
            'app_paterno'   => $in['app_paterno'] ?? '',
            'app_materno'   => $in['app_materno'] ?? '',
            'rut'           => $in['rut'] ?? '',
            'mail'          => $in['mail'] ?? '',
            'phone_1'       => $in['phone'] ?? '',
            'phone'         => $in['phone'] ?? '',
            'comentario'    => 'Evaluación gratuita (agendada online)',
            'registrar'     => true,
            'sendmail'      => false,
            '_tipo_cobro'   => 'gratis',
        ];

        $booking = null;
        try {
            $buyOrder = $this->bookings->nextBuyOrder();
            // Token sintético: no hay Webpay, pero la columna es UNIQUE/útil para trazar.
            $synthToken = 'FREE-' . substr(md5($buyOrder), 0, 20);

            $booking = $this->bookings->create([
                'buy_order'          => $buyOrder,
                'token'              => $synthToken,
                'amount'             => 0,
                'fecha'              => $in['fecha'],
                'hora_inicio'        => $in['horaInicio'],
                'hora_fin'           => $in['horaFin'],
                'servicio'           => $box,
                'profesional'        => $profesional,
                'tratamiento'        => $tratamientoId !== '' ? $tratamientoId : null,
                'tratamiento_nombre' => $nombreServicio,
                'customer_name'      => trim($in['name'] . ' ' . ($in['app_paterno'] ?? '')),
                'customer_email'     => $in['mail'] ?? null,
                'customer_phone'     => $in['phone'] ?? null,
                'customer_rut'       => $in['rut'] ?? null,
                'payload'            => $payload,
            ]);

            [$citaId, $error, $intentos] = $this->crearCitaConReintentos($payload);
            if (!$citaId) {
                throw new \RuntimeException($error ?? 'reservo no devolvió id de cita');
            }

            $this->bookings->update($booking['id'], [
                'status'        => 'PAGADO', // confirmada (sin cobro)
                'cita_id'       => $citaId,
                'intentos_cita' => $intentos,
            ]);

            $this->avisarPacienteCitaConfirmada($this->bookings->findById($booking['id']));

            echo json_encode([
                'ok'      => true,
                'free'    => true,
                'cita_id' => $citaId,
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            error_log('[ReservoBooking eval-gratis] ' . $e->getMessage());
            // Sin esto la fila quedaba PENDIENTE para siempre y además bloqueaba
            // el hueco para el siguiente paciente por el candado de slot.
            if ($booking) {
                $this->bookings->update($booking['id'], [
                    'status'     => 'ERROR',
                    'last_error' => mb_substr($e->getMessage(), 0, 500),
                ]);
            }
            http_response_code(502);
            echo json_encode(['ok' => false, 'error' => 'No se pudo agendar la evaluación.'], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * GET|POST /reservo/pago/confirm  (return de Transbank)
     */
    public function confirm(): void
    {
        $baseUrl  = rtrim($this->config['app']['url'], '/');
        $token    = $_POST['token_ws'] ?? $_GET['token_ws'] ?? null;
        $tbkToken = $_POST['TBK_TOKEN'] ?? $_GET['TBK_TOKEN'] ?? null;
        $tbkOrden = $_POST['TBK_ORDEN_COMPRA'] ?? $_GET['TBK_ORDEN_COMPRA'] ?? null;

        // ── Retornos que NO son un pago aprobado: cancelación, error de
        // formulario o timeout. Nunca se commitea aquí. Y, sobre todo, nunca se
        // pisa una reserva que ya terminó: Transbank puede reenviar el retorno
        // y el usuario puede volver atrás, y una reserva cobrada y agendada no
        // puede terminar marcada como CANCELADO.
        if ($tbkToken || !$token) {
            $b = null;
            if ($token)            $b = $this->bookings->findByToken($token);
            if (!$b && $tbkToken)  $b = $this->bookings->findByToken($tbkToken);
            if (!$b && $tbkOrden)  $b = $this->bookings->findByBuyOrder($tbkOrden);

            if ($b && $b['status'] !== 'PENDIENTE') {
                $this->redirigirSegunEstado($baseUrl, $b);
            }
            if ($b) {
                // token_ws + TBK_TOKEN juntos = error en el formulario de pago.
                // Solo TBK_TOKEN (o ninguno) = el usuario anuló o expiró.
                $this->bookings->transicionarDesdePendiente(
                    $b['id'],
                    ($token && $tbkToken) ? 'ERROR' : 'CANCELADO'
                );
            }
            Response::redirect("{$baseUrl}/confirmacion-cita?status=cancelled");
        }

        $booking = $this->bookings->findByToken($token);
        if (!$booking) {
            error_log('[ReservoBooking confirm] token sin reserva asociada');
            Response::redirect("{$baseUrl}/confirmacion-cita?status=error&reason=not_found");
        }

        // IDEMPOTENCIA: si esta reserva ya se resolvió, no se vuelve a commitear
        // ni a agendar. Un refresco de la página de retorno mostraba antes un
        // error (Transbank rechaza el segundo commit) sobre una cita que sí existía.
        if ($booking['status'] !== 'PENDIENTE') {
            $this->redirigirSegunEstado($baseUrl, $booking);
        }

        try {
            $tx = $this->createTransaction();
            $resp = $tx->commit($token);
        } catch (\Throwable $e) {
            // Puede ser el segundo retorno de una transacción ya cerrada por
            // otra petición en paralelo: si el estado ya cambió, no es un error.
            $fresco = $this->bookings->findById($booking['id']);
            if ($fresco && $fresco['status'] !== 'PENDIENTE') {
                $this->redirigirSegunEstado($baseUrl, $fresco);
            }
            error_log('[ReservoBooking confirm] commit falló: ' . $e->getMessage());
            $this->bookings->update($booking['id'], [
                'last_error' => mb_substr('commit: ' . $e->getMessage(), 0, 500),
            ]);
            Response::redirect("{$baseUrl}/confirmacion-cita?status=error&reason=server_error");
        }

        $codigo   = (int) $resp->getResponseCode();
        $aprobado = ($codigo === 0);
        $auth     = $resp->getAuthorizationCode();
        $montoTbk = (int) $resp->getAmount();
        $ordenTbk = (string) $resp->getBuyOrder();
        $tarjeta  = null;
        try {
            $detalle = $resp->getCardDetail();
            $tarjeta = is_array($detalle) ? ($detalle['card_number'] ?? null) : null;
        } catch (\Throwable $e) { /* el detalle de tarjeta es opcional */ }

        // Todo lo que dijo Transbank se guarda ANTES de tocar reservo.cl. Si algo
        // falla más adelante, el rastro del dinero ya está en la base.
        $datosPago = [
            'response_code'      => $codigo,
            'payment_status'     => (string) $resp->getStatus(),
            'amount_paid'        => $montoTbk ?: null,
            'card_number'        => $tarjeta,
            'authorization_code' => $auth,
        ];

        if (!$aprobado) {
            $this->bookings->update($booking['id'], $datosPago + ['status' => 'RECHAZADO']);
            Response::redirect("{$baseUrl}/confirmacion-cita?status=rejected");
        }

        $datosPago['paid_at'] = date('Y-m-d H:i:s');

        // Coherencia entre lo que se pidió cobrar y lo que Transbank cobró.
        // Una orden que no corresponde es motivo para NO agendar y revisar a mano.
        if ($ordenTbk !== '' && $ordenTbk !== (string) $booking['buy_order']) {
            error_log("[ReservoBooking confirm] buy_order no coincide: Transbank={$ordenTbk} reserva={$booking['buy_order']}");
            $this->bookings->update($booking['id'], $datosPago + [
                'status'      => 'PAGADO_SIN_CITA',
                'last_error'  => "buy_order no coincide (Transbank: {$ordenTbk})",
                'alertado_at' => date('Y-m-d H:i:s'),
            ]);
            $this->alertarClinicaPagoSinCita($this->bookings->findById($booking['id']));
            Response::redirect("{$baseUrl}/confirmacion-cita?status=paid_pending&orden={$booking['buy_order']}");
        }
        if ($montoTbk > 0 && $montoTbk !== (int) $booking['amount']) {
            // El cobro es válido (Transbank ya capturó), pero la diferencia debe
            // quedar registrada para la conciliación.
            error_log("[ReservoBooking confirm] monto distinto: cobrado={$montoTbk} esperado={$booking['amount']} orden={$booking['buy_order']}");
        }

        // Pago aprobado: crear la cita en reservo con el abono en el comentario.
        $payload = json_decode($booking['payload'], true) ?: [];
        // La etiqueta la decidió el servidor en init() y viaja en el payload; el
        // nombre que mandó el cliente ya no puede cambiar lo que dice el comprobante.
        $etiqueta = (($payload['_tipo_cobro'] ?? 'abono') === 'total') ? 'PAGO TOTAL' : 'ABONO';
        $abonoTxt = $etiqueta . ' $' . number_format((int) $booking['amount'], 0, ',', '.')
            . ' pagado vía Webpay (Aut: ' . $auth . ', orden ' . $booking['buy_order'] . ')';
        $payload['comentario'] = trim(($payload['comentario'] ?? '') . ' | ' . $abonoTxt, ' |');

        [$citaId, $error, $intentos] = $this->crearCitaConReintentos($payload);

        if ($citaId) {
            $this->bookings->update($booking['id'], $datosPago + [
                'status'        => 'PAGADO',
                'cita_id'       => $citaId,
                'intentos_cita' => $intentos,
            ]);
            $this->avisarPacienteCitaConfirmada($this->bookings->findById($booking['id']));

            // No incluimos el tratamiento (dato de salud) en la URL de retorno:
            // el Meta Pixel de la web enviaría esa URL a un tercero. Sólo estado + datos no sensibles.
            $q = http_build_query([
                'status' => 'success',
                'id'     => $citaId,
                'fecha'  => $booking['fecha'],
                'hora'   => $booking['hora_inicio'],
            ]);
            Response::redirect("{$baseUrl}/confirmacion-cita?{$q}");
        }

        // El pago se cobró pero la cita no existe. Estado propio (distinto del
        // ERROR sin cargo), correo a la clínica y rastro completo para gestionarlo.
        error_log('[ReservoBooking confirm] cita FALLIDA tras pago OK, orden ' . $booking['buy_order'] . ': ' . $error);
        $this->bookings->update($booking['id'], $datosPago + [
            'status'        => 'PAGADO_SIN_CITA',
            'intentos_cita' => $intentos,
            'last_error'    => mb_substr((string) $error, 0, 500),
            'alertado_at'   => date('Y-m-d H:i:s'),
        ]);
        $this->alertarClinicaPagoSinCita($this->bookings->findById($booking['id']));

        Response::redirect("{$baseUrl}/confirmacion-cita?status=paid_pending&orden={$booking['buy_order']}");
    }

    // ─────────────────────────────────────────────────────────── internos ───

    /** Manda al paciente a la pantalla que corresponde a un estado ya resuelto. */
    private function redirigirSegunEstado(string $baseUrl, array $b): void
    {
        switch ($b['status']) {
            case 'PAGADO':
                $q = http_build_query([
                    'status' => 'success',
                    'id'     => $b['cita_id'] ?? '',
                    'fecha'  => $b['fecha'],
                    'hora'   => $b['hora_inicio'],
                ]);
                Response::redirect("{$baseUrl}/confirmacion-cita?{$q}");
                // no alcanza (redirect hace exit)
            case 'PAGADO_SIN_CITA':
                Response::redirect("{$baseUrl}/confirmacion-cita?status=paid_pending&orden={$b['buy_order']}");
            case 'RECHAZADO':
                Response::redirect("{$baseUrl}/confirmacion-cita?status=rejected");
            default:
                Response::redirect("{$baseUrl}/confirmacion-cita?status=cancelled");
        }
    }

    /**
     * Crea la cita en reservo.cl reintentando ante fallos transitorios (sesión
     * del scraper caída, timeout de red). Devuelve [citaId|null, error|null, intentos].
     *
     * Un `id` vacío se trata como FALLO: antes pasaba como éxito y la reserva
     * quedaba PAGADO con cita_id NULL, es decir, cobrada y sin cita, mostrando
     * "¡Cita Confirmada!" al paciente.
     */
    public function crearCitaConReintentos(array $payload): array
    {
        // Las claves internas (con guion bajo) no viajan a reservo.
        $limpio = array_filter(
            $payload,
            static fn($k) => strpos((string) $k, '_') !== 0,
            ARRAY_FILTER_USE_KEY
        );

        $ultimoError = null;
        for ($intento = 1; $intento <= self::MAX_INTENTOS_CITA; $intento++) {
            try {
                $reservo = new Reservo($this->config['reservo'] ?? []);
                $res = $reservo->agendarCita($limpio);

                if (isset($res['error']) && (int) $res['error'] !== 0) {
                    throw new \RuntimeException('reservo error=' . $res['error']);
                }
                $citaId = $res['id'] ?? null;
                if (empty($citaId)) {
                    throw new \RuntimeException(
                        'reservo no devolvió id de cita: ' . mb_substr(json_encode($res, JSON_UNESCAPED_UNICODE), 0, 200)
                    );
                }
                return [(string) $citaId, null, $intento];
            } catch (\Throwable $e) {
                $ultimoError = $e->getMessage();
                error_log("[ReservoBooking] intento {$intento}/" . self::MAX_INTENTOS_CITA . " de crear cita falló: " . $ultimoError);
                if ($intento < self::MAX_INTENTOS_CITA) {
                    sleep(self::PAUSA_REINTENTO);
                }
            }
        }
        return [null, $ultimoError, self::MAX_INTENTOS_CITA];
    }

    /** Destinatarios internos para los avisos de la clínica. */
    private function correosClinica(): array
    {
        $cfg = $this->config['email']['reservas_email'] ?? null;
        if ($cfg) return array_map('trim', explode(',', (string) $cfg));
        $clinic = $this->config['email']['clinic_email'] ?? 'contacto@cialo.cl';
        return array_values(array_unique(['pagos@cialo.cl', $clinic]));
    }

    private static function esc(?string $s): string
    {
        return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
    }

    private static function fechaLegible(string $iso, string $hora): string
    {
        $ts = strtotime($iso);
        if ($ts === false) return self::esc($iso . ' ' . $hora);
        $dias  = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        $meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        return $dias[(int) date('w', $ts)] . ' ' . (int) date('j', $ts) . ' de ' . $meses[(int) date('n', $ts) - 1]
            . ' a las ' . substr($hora, 0, 5);
    }

    /**
     * Confirmación al paciente. Hasta ahora no se enviaba NINGÚN correo: quien
     * pagaba su reserva solo veía una página que le pedía tomar una captura.
     */
    public function avisarPacienteCitaConfirmada(?array $b): void
    {
        if (!$b || empty($b['customer_email'])) return;
        try {
            $monto = (int) $b['amount'];
            $cuando = self::fechaLegible((string) $b['fecha'], (string) $b['hora_inicio']);
            $pagoHtml = $monto > 0
                ? '<tr><td style="padding:6px 0;color:#6f6a5c">Pagado</td><td style="padding:6px 0;text-align:right;color:#1b1a18"><strong>$'
                    . number_format($monto, 0, ',', '.') . '</strong> (se descuenta del valor de tu atención)</td></tr>'
                : '';

            $html = '<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1b1a18">'
                . '<h2 style="font-weight:400;color:#1b1a18">Tu hora está confirmada</h2>'
                . '<p style="color:#6f6a5c;line-height:1.6">Hola ' . self::esc($b['customer_name']) . ', reservamos tu hora en Clínica CIALO.</p>'
                . '<table style="width:100%;border-collapse:collapse;border-top:1px solid #eee;border-bottom:1px solid #eee;margin:18px 0">'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Fecha</td><td style="padding:6px 0;text-align:right"><strong>' . $cuando . '</strong></td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Motivo</td><td style="padding:6px 0;text-align:right">' . self::esc($b['tratamiento_nombre'] ?: 'Atención') . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Código de cita</td><td style="padding:6px 0;text-align:right">' . self::esc($b['cita_id']) . '</td></tr>'
                . $pagoHtml
                . '</table>'
                . '<p style="color:#6f6a5c;line-height:1.6">Llega 10 minutos antes con tu carnet. Si necesitas cambiar o anular tu hora, escríbenos por WhatsApp al +56 9 8202 8473.</p>'
                . '<p style="color:#9a958a;font-size:12px">Clínica CIALO · Los Ángeles</p>'
                . '</div>';

            Mailer::send((string) $b['customer_email'], 'Tu hora en Clínica CIALO está confirmada', $html);
        } catch (\Throwable $e) {
            // Un fallo de correo nunca puede tumbar una reserva ya confirmada.
            error_log('[ReservoBooking] no se pudo enviar la confirmación al paciente: ' . $e->getMessage());
        }
    }

    /**
     * Alerta interna: se cobró y la cita no existe. Es el correo que impide que
     * un cobro sin servicio se pierda hasta que el paciente reclame.
     */
    private function alertarClinicaPagoSinCita(?array $b): void
    {
        if (!$b) return;
        try {
            $cuando = self::fechaLegible((string) $b['fecha'], (string) $b['hora_inicio']);
            $html = '<div style="font-family:Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;color:#1b1a18">'
                . '<h2 style="color:#b00020;font-weight:600">Pago cobrado SIN cita creada</h2>'
                . '<p style="line-height:1.6">Se capturó el pago pero no se pudo crear la cita en reservo.cl. '
                . '<strong>Hay que agendarla a mano o devolver el dinero.</strong></p>'
                . '<table style="width:100%;border-collapse:collapse;border-top:1px solid #eee;margin:16px 0">'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Paciente</td><td style="padding:6px 0"><strong>' . self::esc($b['customer_name']) . '</strong></td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">RUT</td><td style="padding:6px 0">' . self::esc($b['customer_rut']) . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Teléfono</td><td style="padding:6px 0">' . self::esc($b['customer_phone']) . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Email</td><td style="padding:6px 0">' . self::esc($b['customer_email']) . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Hora pedida</td><td style="padding:6px 0"><strong>' . $cuando . '</strong></td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Servicio</td><td style="padding:6px 0">' . self::esc($b['tratamiento_nombre']) . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Box / profesional</td><td style="padding:6px 0">' . self::esc($b['servicio']) . ' / ' . self::esc($b['tratamiento']) . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Monto cobrado</td><td style="padding:6px 0"><strong>$' . number_format((int) ($b['amount_paid'] ?: $b['amount']), 0, ',', '.') . '</strong></td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Orden</td><td style="padding:6px 0">' . self::esc($b['buy_order']) . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Autorización</td><td style="padding:6px 0">' . self::esc($b['authorization_code']) . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Intentos</td><td style="padding:6px 0">' . (int) $b['intentos_cita'] . '</td></tr>'
                . '<tr><td style="padding:6px 0;color:#6f6a5c">Error</td><td style="padding:6px 0;color:#b00020">' . self::esc($b['last_error']) . '</td></tr>'
                . '</table>'
                . '<p style="color:#6f6a5c">Queda en el panel: Admin → Reservas → filtro “Pagadas sin cita”.</p>'
                . '</div>';

            $asunto = 'URGENTE: pago sin cita — ' . $b['buy_order'] . ' — ' . $b['customer_name'];
            foreach ($this->correosClinica() as $i => $to) {
                if ($i > 0) usleep(1200000); // el SMTP del hosting limita ráfagas
                Mailer::send($to, $asunto, $html, true);
            }
        } catch (\Throwable $e) {
            error_log('[ReservoBooking] FALLÓ la alerta de pago sin cita: ' . $e->getMessage());
        }
    }
}
