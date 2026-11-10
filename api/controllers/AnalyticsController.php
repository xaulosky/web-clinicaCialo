<?php
/**
 * AnalyticsController
 * Ingesta first-party de eventos + agregados de analítica.
 *
 * - ingest() es PÚBLICO (lo llama el sitio) y ULTRA tolerante: nunca lanza 500
 *   al cliente por datos malformados; siempre responde success.
 * - El resto de métodos (agregados) los protege el router (middleware admin)
 *   ANTES de instanciar; por eso aquí NO se llama a Auth::requireAdmin().
 */

namespace App\Controllers;

use App\Response;
use App\Database;

class AnalyticsController
{
    /** Largos máximos de columna en la tabla `events` (para truncar con mb_substr). */
    private const LEN = [
        'event_name'         => 40,
        'anonymous_id'       => 64,
        'session_id'         => 64,
        'user_id'            => 36,
        'path'               => 255,
        'treatment_id'       => 100,
        'treatment_category' => 80,
        'search_term'        => 150,
        'referrer'           => 255,
        'utm_source'         => 100,
        'utm_medium'         => 100,
        'utm_campaign'       => 100,
        'utm_content'        => 100,
        'utm_term'           => 100,
        'device'             => 20,
        'country'            => 2,
        'order_id'           => 36,
        'user_agent'         => 255,
    ];

    // ------------------------------------------------------------------
    // INGESTA (PÚBLICA)
    // ------------------------------------------------------------------

    /**
     * POST /analytics/events  (público, sin auth)
     *
     * Acepta un evento {event_name,...} o un batch {events:[...]}.
     * Inserta hasta 50 filas en `events`. NUNCA lanza 500: ante cualquier
     * problema responde igual con success.
     */
    public function ingest(): void
    {
        $received = 0;

        try {
            $raw = file_get_contents('php://input');
            $payload = json_decode((string) $raw, true);

            // Normalizar a un array de eventos.
            $events = [];
            if (is_array($payload)) {
                if (isset($payload['events']) && is_array($payload['events'])) {
                    $events = $payload['events'];
                } elseif (array_is_list($payload)) {
                    // El body es directamente un array de eventos.
                    $events = $payload;
                } else {
                    // El body es un único evento asociativo.
                    $events = [$payload];
                }
            }

            // Máx 50; descarta el resto.
            if (count($events) > 50) {
                $events = array_slice($events, 0, 50);
            }

            $db = Database::getInstance();
            $serverUa = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');

            foreach ($events as $ev) {
                if (!is_array($ev)) {
                    continue;
                }
                try {
                    $this->insertEvent($db, $ev, $serverUa);
                    $received++;
                } catch (\Throwable $e) {
                    // Un evento malo no debe tumbar el resto.
                }
            }
        } catch (\Throwable $e) {
            // Body ilegible / cualquier fallo global: respondemos igual success.
        }

        Response::success(['received' => $received]);
    }

    /**
     * Inserta una fila en `events`. Trunca strings y deja NULL los ausentes.
     */
    private function insertEvent(Database $db, array $ev, string $serverUa): void
    {
        $eventName = $this->str($ev['event_name'] ?? null, 'event_name');
        if ($eventName === null || $eventName === '') {
            $eventName = 'page_view';
        }

        // device: usa el del evento o lo deriva del UA del servidor.
        $device = $this->str($ev['device'] ?? null, 'device');
        if ($device === null || $device === '') {
            $device = $this->deviceFromUa($serverUa);
        }

        $userAgent = $this->truncate($serverUa, self::LEN['user_agent']);

        $cols = [
            'id'                 => Database::uuid(),
            'event_name'         => $eventName,
            'anonymous_id'       => $this->str($ev['anonymous_id'] ?? null, 'anonymous_id'),
            'session_id'         => $this->str($ev['session_id'] ?? null, 'session_id'),
            'user_id'            => $this->str($ev['user_id'] ?? null, 'user_id'),
            'path'               => $this->str($ev['path'] ?? null, 'path'),
            'treatment_id'       => $this->str($ev['treatment_id'] ?? null, 'treatment_id'),
            'treatment_category' => $this->str($ev['treatment_category'] ?? null, 'treatment_category'),
            'search_term'        => $this->str($ev['search_term'] ?? null, 'search_term'),
            'results_count'      => $this->intOrNull($ev['results_count'] ?? null),
            'referrer'           => $this->str($ev['referrer'] ?? null, 'referrer'),
            'utm_source'         => $this->str($ev['utm_source'] ?? null, 'utm_source'),
            'utm_medium'         => $this->str($ev['utm_medium'] ?? null, 'utm_medium'),
            'utm_campaign'       => $this->str($ev['utm_campaign'] ?? null, 'utm_campaign'),
            'utm_content'        => $this->str($ev['utm_content'] ?? null, 'utm_content'),
            'utm_term'           => $this->str($ev['utm_term'] ?? null, 'utm_term'),
            'device'             => $this->truncate($device, self::LEN['device']),
            'country'            => $this->str($ev['country'] ?? null, 'country'),
            'value_clp'          => $this->intOrNull($ev['value_clp'] ?? null),
            'order_id'           => $this->str($ev['order_id'] ?? null, 'order_id'),
            'user_agent'         => $userAgent,
        ];

        $sql = "INSERT INTO events
                (id, event_name, anonymous_id, session_id, user_id, path,
                 treatment_id, treatment_category, search_term, results_count,
                 referrer, utm_source, utm_medium, utm_campaign, utm_content,
                 utm_term, device, country, value_clp, order_id, user_agent, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

        $db->query($sql, array_values($cols));
    }

    // ------------------------------------------------------------------
    // AGREGADOS (router exige admin)
    // ------------------------------------------------------------------

    /**
     * GET /analytics/overview
     * Visitas (DISTINCT anonymous_id) y pageviews en el rango, más serie diaria.
     */
    public function overview(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();
        $params = [$from, $to];

        $totals = $db->fetch(
            "SELECT
                COUNT(DISTINCT anonymous_id) AS visitas,
                COUNT(CASE WHEN event_name = 'page_view' THEN 1 END) AS pageviews
             FROM events
             WHERE {$this->rangeClause()}",
            $params
        ) ?? ['visitas' => 0, 'pageviews' => 0];

        $serie = $db->fetchAll(
            "SELECT DATE(created_at) AS dia,
                    COUNT(DISTINCT anonymous_id) AS visitas,
                    COUNT(*) AS eventos
             FROM events
             WHERE event_name = 'page_view' AND {$this->rangeClause()}
             GROUP BY dia
             ORDER BY dia",
            $params
        );

        Response::success([
            'periodo'   => ['from' => $from, 'to' => $to],
            'visitas'   => (int) $totals['visitas'],
            'pageviews' => (int) $totals['pageviews'],
            'serie'     => $serie,
        ]);
    }

    /**
     * GET /analytics/top-pages
     */
    public function topPages(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();
        $limit = $this->limit(20);

        $rows = $db->fetchAll(
            "SELECT path,
                    COUNT(*) AS vistas,
                    COUNT(DISTINCT anonymous_id) AS visitantes
             FROM events
             WHERE event_name = 'page_view' AND {$this->rangeClause()}
             GROUP BY path
             ORDER BY vistas DESC
             LIMIT {$limit}",
            [$from, $to]
        );

        Response::success([
            'periodo' => ['from' => $from, 'to' => $to],
            'pages'   => $rows,
        ]);
    }

    /**
     * GET /analytics/top-treatments
     */
    public function topTreatments(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();
        $limit = $this->limit(20);

        $rows = $db->fetchAll(
            "SELECT treatment_id,
                    treatment_category,
                    COUNT(*) AS vistas,
                    COUNT(DISTINCT anonymous_id) AS visitantes
             FROM events
             WHERE event_name = 'view_treatment' AND {$this->rangeClause()}
             GROUP BY treatment_id, treatment_category
             ORDER BY vistas DESC
             LIMIT {$limit}",
            [$from, $to]
        );

        Response::success([
            'periodo'    => ['from' => $from, 'to' => $to],
            'treatments' => $rows,
        ]);
    }

    /**
     * GET /analytics/funnel
     * Cuenta por etapa: page_view, view_treatment, add_to_cart, begin_checkout, purchase.
     */
    public function funnel(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();

        $etapas = ['page_view', 'view_treatment', 'add_to_cart', 'begin_checkout', 'purchase'];
        $funnel = [];

        foreach ($etapas as $etapa) {
            $row = $db->fetch(
                "SELECT COUNT(*) AS eventos,
                        COUNT(DISTINCT anonymous_id) AS visitantes
                 FROM events
                 WHERE event_name = ? AND {$this->rangeClause()}",
                [$etapa, $from, $to]
            ) ?? ['eventos' => 0, 'visitantes' => 0];

            $funnel[] = [
                'etapa'       => $etapa,
                'eventos'     => (int) $row['eventos'],
                'visitantes'  => (int) $row['visitantes'],
            ];
        }

        Response::success([
            'periodo' => ['from' => $from, 'to' => $to],
            'funnel'  => $funnel,
        ]);
    }

    /**
     * GET /analytics/sources
     */
    public function sources(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();

        $rows = $db->fetchAll(
            "SELECT COALESCE(NULLIF(utm_source, ''), 'directo') AS fuente,
                    COUNT(DISTINCT anonymous_id) AS visitantes,
                    COUNT(*) AS eventos
             FROM events
             WHERE event_name = 'page_view' AND {$this->rangeClause()}
             GROUP BY fuente
             ORDER BY visitantes DESC",
            [$from, $to]
        );

        Response::success([
            'periodo' => ['from' => $from, 'to' => $to],
            'sources' => $rows,
        ]);
    }

    /**
     * GET /analytics/searches
     * min_resultados = 0 marca búsquedas sin resultados.
     */
    public function searches(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();

        $rows = $db->fetchAll(
            "SELECT search_term,
                    COUNT(*) AS veces,
                    MIN(results_count) AS min_resultados
             FROM events
             WHERE event_name = 'search'
               AND search_term IS NOT NULL
               AND {$this->rangeClause()}
             GROUP BY search_term
             ORDER BY veces DESC
             LIMIT 50",
            [$from, $to]
        );

        Response::success([
            'periodo'  => ['from' => $from, 'to' => $to],
            'searches' => $rows,
        ]);
    }

    // ------------------------------------------------------------------
    // HELPERS PRIVADOS
    // ------------------------------------------------------------------

    /**
     * Cláusula de rango reutilizable. Incluye el día 'to' completo.
     * Espera placeholders [from, to] en ese orden.
     */
    private function rangeClause(): string
    {
        return "created_at >= ? AND created_at < (? + INTERVAL 1 DAY)";
    }

    /**
     * Rango de fechas para analytics. Default: ÚLTIMOS 30 DÍAS.
     * Lee $_GET['from'] y $_GET['to'] (YYYY-MM-DD); si no matchean, usa el default.
     * @return array{0:string,1:string} [from, to]
     */
    private function dateRange(): array
    {
        $re = '/^\d{4}-\d{2}-\d{2}$/';

        $from = $_GET['from'] ?? '';
        $to   = $_GET['to'] ?? '';

        if (!is_string($from) || !preg_match($re, $from)) {
            $from = date('Y-m-d', strtotime('-30 days'));
        }
        if (!is_string($to) || !preg_match($re, $to)) {
            $to = date('Y-m-d');
        }

        return [$from, $to];
    }

    /**
     * Limit entero saneado desde $_GET['limit'], con default.
     */
    private function limit(int $default): int
    {
        $raw = $_GET['limit'] ?? null;
        if ($raw === null || !is_numeric($raw)) {
            return $default;
        }
        $n = (int) $raw;
        return $n > 0 ? $n : $default;
    }

    /**
     * Deriva device del user agent del servidor.
     */
    private function deviceFromUa(string $ua): string
    {
        if (preg_match('/(Mobi|Android|iPhone)/i', $ua)) {
            return 'mobile';
        }
        if (preg_match('/(iPad|Tablet)/i', $ua)) {
            return 'tablet';
        }
        return 'desktop';
    }

    /**
     * Normaliza un valor a string truncado al largo de su columna, o NULL.
     */
    private function str(mixed $val, string $col): ?string
    {
        if ($val === null) {
            return null;
        }
        if (is_bool($val) || is_array($val)) {
            return null;
        }
        $s = (string) $val;
        return $this->truncate($s, self::LEN[$col] ?? null);
    }

    /**
     * Trunca con mb_substr para no romper el INSERT.
     */
    private function truncate(?string $s, ?int $len): ?string
    {
        if ($s === null || $len === null) {
            return $s;
        }
        return mb_substr($s, 0, $len);
    }

    /**
     * Devuelve int o NULL (campos ausentes => NULL).
     */
    private function intOrNull(mixed $val): ?int
    {
        if ($val === null || $val === '' || !is_numeric($val)) {
            return null;
        }
        return (int) $val;
    }
}
