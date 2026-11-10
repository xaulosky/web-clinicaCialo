<?php
// api/controllers/ReservoController.php
//
// Endpoints públicos de reservas para cialo.cl. Usan App\Reservo, que hace
// el scraping de reservo.cl directamente desde este backend. Las credenciales
// viven en config.php y nunca llegan al navegador.

namespace App\Controllers;

use App\Reservo;
use App\ReservoBoxes;
use App\Response;

class ReservoController
{
    private Reservo $reservo;
    private array $reservoCfg;

    public function __construct()
    {
        $config = require __DIR__ . '/../config/config.php';
        $this->reservoCfg = $config['reservo'] ?? [];
        // Boxes: base deployable (ReservoBoxes) + overrides del config del server.
        $this->reservoCfg['agendas'] = ReservoBoxes::merge($this->reservoCfg['agendas'] ?? []);
        $this->reservo = new Reservo($this->reservoCfg);
    }

    /** Convierte "MIN", "HH:MM" o "HH:MM:SS" a minutos. */
    private static function durToMin(string $s): int
    {
        $s = trim($s);
        if ($s === '') return 30;
        if (strpos($s, ':') !== false) {
            $p = array_map('intval', explode(':', $s));
            return ($p[0] ?? 0) * 60 + ($p[1] ?? 0);
        }
        return (int) $s;
    }

    /** Profesionales agendables (con box configurado) para un token. */
    private function boxMap(string $token): array
    {
        $a = $this->reservoCfg['agendas'][$token] ?? [];
        return $a['box_por_profesional'] ?? [];
    }

    /** "HH:MM" -> minutos desde medianoche. */
    private static function hmToMin(string $h): int
    {
        $p = explode(':', $h);
        return ((int)($p[0] ?? 0)) * 60 + ((int)($p[1] ?? 0));
    }

    /**
     * Quita de la grilla los horarios que ya tienen una cita en reservo. Lee las
     * citas reales de la fecha (getOcupadosPorFecha) y, por cada profesional
     * agendable, descarta los slots que se solapan con alguna de sus citas. Si
     * un slot queda sin profesionales libres, se elimina.
     *
     * Fail-open: si no se pueden leer las citas, devuelve la grilla sin filtrar
     * (reservo igual valida el choque al confirmar la cita).
     *
     * @param array $slots  [['horaInicio','horaFin','profesionales'=>[ids]], ...]
     */
    private function filtrarOcupados(string $token, string $fecha, array $slots): array
    {
        if (!$slots) return $slots;
        $boxMap = $this->boxMap($token); // prof_id => box_id

        try {
            // box_id => etiqueta de agenda, para casar contra la columna box de
            // las citas (p.ej. box 45366 => "Box 9 Dr. Laucirica").
            $labelPorBox = [];
            foreach ($this->reservo->getAgendas() as $a) {
                $labelPorBox[(string)($a['id'] ?? '')] = (string)($a['nombre'] ?? '');
            }

            // Intervalos [iniMin, finMin] ocupados de la fecha, por prof agendable.
            $ocupados = $this->reservo->getOcupadosPorFecha($fecha);
            $intervalosPorProf = [];
            foreach ($boxMap as $pid => $box) {
                $label = $labelPorBox[(string)$box] ?? '';
                if ($label === '') continue;
                $ints = [];
                foreach ($ocupados as $oc) {
                    if (mb_stripos($oc['box'], $label) === false) continue;
                    $ints[] = [self::hmToMin($oc['horaInicio']), self::hmToMin($oc['horaFin'])];
                }
                $intervalosPorProf[$pid] = $ints;
            }
        } catch (\Throwable $e) {
            error_log('[ReservoController] filtrarOcupados fail-open: ' . $e->getMessage());
            return $slots;
        }

        $out = [];
        foreach ($slots as $s) {
            $si = self::hmToMin($s['horaInicio']);
            $se = self::hmToMin($s['horaFin']);
            $profsLibres = array_values(array_filter(
                $s['profesionales'] ?? [],
                function ($pid) use ($intervalosPorProf, $si, $se) {
                    foreach ($intervalosPorProf[$pid] ?? [] as [$bi, $bf]) {
                        if ($bi < $se && $bf > $si) return false; // se solapa => ocupado
                    }
                    return true;
                }
            ));
            if ($profsLibres) {
                $s['profesionales'] = $profsLibres;
                $out[] = $s;
            }
        }
        return $out;
    }

    /** GET /reservo/servicios */
    public function servicios(): void
    {
        $this->run(fn() => ['data' => $this->reservo->getServicios()]);
    }

    /** GET /reservo/agendas */
    public function agendas(): void
    {
        $this->run(fn() => ['data' => $this->reservo->getAgendas()]);
    }

    /**
     * GET /reservo/agendables
     * Qué agendas públicas admiten reserva propia y con qué profesionales
     * (id reservo con box configurado). Solo lee config: rápido y sin scraping.
     * Lo usa el frontend para decidir flujo propio vs iframe dinámicamente.
     */
    public function agendables(): void
    {
        $this->run(function () {
            $out = [];
            foreach (($this->reservoCfg['agendas'] ?? []) as $token => $a) {
                $profs = array_keys(array_filter($a['box_por_profesional'] ?? []));
                if ($profs) $out[$token] = array_map('strval', $profs);
            }
            return ['agendas' => $out, 'eval_tokens' => ReservoBoxes::EVAL_TOKENS];
        });
    }

    /** GET /reservo/disponibilidad?fecha=YYYY-MM-DD&vista=dia&servicios=ID,ID */
    public function disponibilidad(): void
    {
        $this->run(function () {
            $fecha = $_GET['fecha'] ?? date('Y-m-d');
            $vista = $_GET['vista'] ?? 'dia';
            $servicios = $_GET['servicios'] ?? null;
            return [
                'fecha' => $fecha,
                'data'  => $this->reservo->getDisponibilidad($fecha, $vista, $servicios),
            ];
        });
    }

    /**
     * GET /reservo/agenda-info?token=TOKEN
     * Resuelve un token público a sus profesionales (con flag agendable según
     * la config de boxes) y sus tratamientos. Sin datos de pacientes.
     */
    public function agendaInfo(): void
    {
        $this->run(function () {
            $token = $_GET['token'] ?? '';
            if ($token === '') throw new \InvalidArgumentException('Falta "token".');

            $pub = $this->reservo->getAgendaPublica($token);
            $boxMap = $this->boxMap($token);

            $profs = array_map(function ($p) use ($boxMap) {
                $p['agendable'] = !empty($boxMap[$p['id']]); // tiene box configurado
                return $p;
            }, $pub['profesionales']);

            return [
                'token'         => $token,
                'profesionales' => $profs,
                'tratamientos'  => $pub['tratamientos'],
            ];
        });
    }

    /**
     * GET /reservo/slots?token=TOKEN&fecha=YYYY-MM-DD&duracion=MIN|HH:MM[:SS][&profesional=ID]
     * Horarios disponibles. Sin `profesional` -> combina los profesionales
     * agendables del token (cada slot indica quién está disponible).
     */
    public function slots(): void
    {
        $this->run(function () {
            $token = $_GET['token'] ?? '';
            $fecha = $_GET['fecha'] ?? date('Y-m-d');
            $durMin = self::durToMin((string)($_GET['duracion'] ?? '30'));
            if ($token === '') throw new \InvalidArgumentException('Falta "token".');
            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) {
                throw new \InvalidArgumentException('Fecha inválida (use YYYY-MM-DD).');
            }

            $boxMap = $this->boxMap($token);
            // solo con box configurado; strval porque PHP entrega claves int
            $agendables = array_map('strval', array_keys(array_filter($boxMap)));
            if (!$agendables) {
                throw new \InvalidArgumentException('Agenda no habilitada para reserva online.');
            }

            $prof = $_GET['profesional'] ?? '';
            if ($prof !== '' && !in_array($prof, $agendables, true)) {
                throw new \InvalidArgumentException('Profesional no agendable para este token.');
            }

            // 1) FUENTE OFICIAL (API v2): los cupos exactos que reservo ofrece al
            // paciente. Su grilla se RE-ANCLA con cada cita tomada (16:20, 16:40…),
            // así que se usa TAL CUAL — construir una grilla propia e intersectar
            // deja días válidos en cero. Requiere el tratamiento.
            $slots = null;
            $tratamientoId = (string) ($_GET['tratamiento'] ?? '');
            if ($tratamientoId !== '') {
                try {
                    $cupos = $this->reservo->getCuposOficiales($token, $fecha, $tratamientoId);
                    if (is_array($cupos)) {
                        $slots = [];
                        foreach ($cupos as $c) {
                            $profs = array_values(array_intersect($c['profs'], $prof !== '' ? [$prof] : $agendables));
                            if (!$profs) continue;
                            $ini = $c['hora'];
                            $min = ((int) substr($ini, 0, 2)) * 60 + ((int) substr($ini, 3, 2)) + $durMin;
                            $slots[] = [
                                'horaInicio'    => $ini,
                                'horaFin'       => sprintf('%02d:%02d', intdiv($min, 60) % 24, $min % 60),
                                'profesionales' => $profs,
                            ];
                        }
                    }
                } catch (\Throwable $e) {
                    error_log('[ReservoController] cupos oficiales fail-open: ' . $e->getMessage());
                }
            }

            // 2) FALLBACK (sin token v2 / sin tratamiento / fallo): grilla propia
            // por ventanas de atención, menos las citas ya tomadas.
            if ($slots === null) {
                if ($prof !== '') {
                    $slots = array_map(function ($s) use ($prof) {
                        $s['profesionales'] = [$prof];
                        return $s;
                    }, $this->reservo->getSlotsProfesional((string)$prof, $fecha, $durMin));
                } else {
                    $slots = $this->reservo->getSlotsCombinados($agendables, $fecha, $durMin);
                }
                $slots = $this->filtrarOcupados($token, $fecha, $slots);
            }

            return [
                'fecha'      => $fecha,
                'token'      => $token,
                'agendables' => $agendables,
                'slots'      => $slots,
            ];
        });
    }

    /**
     * GET /reservo/dias-disponibles?token=T&desde=YYYY-MM-DD&dias=35&duracion=MIN[&profesional=ID]
     * Qué días de los próximos N tienen ventana de atención (sin descontar citas
     * tomadas — eso lo hace /reservo/slots al elegir el día). Una sola llamada
     * a reservo por request: apto para pintar el calendario semanal.
     */
    public function diasDisponibles(): void
    {
        $this->run(function () {
            $token = $_GET['token'] ?? '';
            if ($token === '') throw new \InvalidArgumentException('Falta "token".');
            $desde = $_GET['desde'] ?? date('Y-m-d');
            if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $desde)) {
                throw new \InvalidArgumentException('Fecha inválida (use YYYY-MM-DD).');
            }
            $numDias = max(1, min(60, (int) ($_GET['dias'] ?? 35)));
            $durMin  = self::durToMin((string) ($_GET['duracion'] ?? '30'));

            // strval: PHP convierte las claves numéricas del mapa a int y el
            // in_array estricto rechazaría el id que llega como string.
            $agendables = array_map('strval', array_keys(array_filter($this->boxMap($token))));
            if (!$agendables) {
                throw new \InvalidArgumentException('Agenda no habilitada para reserva online.');
            }
            $prof = $_GET['profesional'] ?? '';
            if ($prof !== '') {
                if (!in_array($prof, $agendables, true)) {
                    throw new \InvalidArgumentException('Profesional no agendable para este token.');
                }
                $agendables = [$prof];
            }

            $disponibles = $this->reservo->getDiasConVentana($agendables, $desde, $numDias, $durMin);

            // Contraste con la disponibilidad OFICIAL (API v2). Dentro del rango
            // que la API alcanzó a verificar (`cubierto_hasta`) sus días SON la
            // verdad: reemplazan a los de ventana (así no se pintan días que en
            // realidad están llenos o bloqueados). Más allá de ese rango se
            // conservan los días de ventana como estimación.
            $tratamientoId = (string) ($_GET['tratamiento'] ?? '');
            if ($tratamientoId !== '') {
                try {
                    $hasta = date('Y-m-d', strtotime($desde) + ($numDias - 1) * 86400);
                    $oficial = $this->reservo->getDiasOficiales($token, $tratamientoId, $prof !== '' ? $prof : null, $desde, $hasta);
                    if (is_array($oficial)) {
                        $cubierto = $oficial['cubierto_hasta'];
                        $disponibles = array_merge(
                            $oficial['dias'],
                            array_filter($disponibles, fn($f) => $f > $cubierto)
                        );
                        $disponibles = array_values(array_unique($disponibles));
                        sort($disponibles);
                    }
                } catch (\Throwable $e) {
                    error_log('[ReservoController] contraste oficial fail-open: ' . $e->getMessage());
                }
            }

            return [
                'desde'       => $desde,
                'dias'        => $numDias,
                'disponibles' => $disponibles,
            ];
        });
    }

    /** POST /reservo/cita  (body JSON con datos de la cita) */
    public function crearCita(): void
    {
        $this->run(function () {
            $body = json_decode(file_get_contents('php://input'), true) ?: [];
            return ['data' => $this->reservo->agendarCita($body)];
        });
    }

    /**
     * POST /reservo/pago/simular  (SOLO local/dev)
     * Simula un pago aprobado: se SALTA Webpay y crea la cita REAL en reservo.cl,
     * resolviendo el box igual que /reservo/pago/init. Protegido por la variable
     * de entorno RESERVO_ALLOW_SIMULATE=1, que solo existe en el arranque local;
     * en producción el endpoint queda inerte (403) aunque el código se suba.
     * Body JSON idéntico al de /reservo/pago/init.
     */
    public function simular(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        if (getenv('RESERVO_ALLOW_SIMULATE') !== '1') {
            http_response_code(403);
            echo json_encode(['ok' => false, 'error' => 'Simulación de pago deshabilitada en este entorno.'], JSON_UNESCAPED_UNICODE);
            return;
        }

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

        // Resolución de box: override por tratamiento -> default por profesional.
        $a       = $this->reservoCfg['agendas'][$token] ?? [];
        $porTrat = $a['box_por_tratamiento'] ?? [];
        $porProf = $a['box_por_profesional'] ?? [];
        if ($tratamientoId !== '' && !empty($porTrat[$tratamientoId])) {
            $box = (string) $porTrat[$tratamientoId];
        } elseif (!empty($porProf[$profesional])) {
            $box = (string) $porProf[$profesional];
        } else {
            http_response_code(409);
            echo json_encode(['ok' => false, 'error' => 'Box no configurado para este profesional/token (agenda no agendable).'], JSON_UNESCAPED_UNICODE);
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
            'comentario'    => trim('[PRUEBA pago simulado] ' . ($in['comentario'] ?? '')),
            'registrar'     => true,
            'sendmail'      => false,
        ];

        try {
            $res = $this->reservo->agendarCita($payload);
            if (isset($res['error']) && (int) $res['error'] !== 0) {
                throw new \RuntimeException('reservo error=' . $res['error']);
            }
            echo json_encode([
                'ok'       => true,
                'simulado' => true,
                'cita_id'  => $res['id'] ?? null,
            ], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            error_log('[ReservoController simular] ' . $e->getMessage());
            http_response_code(502);
            echo json_encode(['ok' => false, 'error' => 'No se pudo crear la cita.', 'detalle' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Ejecuta el callback y serializa la respuesta o el error como JSON.
     */
    private function run(callable $fn): void
    {
        header('Content-Type: application/json; charset=utf-8');
        try {
            echo json_encode($fn(), JSON_UNESCAPED_UNICODE);
        } catch (\InvalidArgumentException $e) {
            http_response_code(400);
            echo json_encode(['error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            error_log('[ReservoController] ' . $e->getMessage());
            http_response_code(502);
            echo json_encode([
                'error'   => 'Error al obtener datos de reservo.cl',
                'detalle' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}
