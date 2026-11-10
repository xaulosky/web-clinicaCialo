<?php
/**
 * Controlador de Reportes de Negocio
 *
 * La autorización admin la aplica el router (middleware) ANTES de instanciar
 * este controlador, por lo que NO se llama a Auth::requireAdmin() aquí.
 */

namespace App\Controllers;

use App\Response;
use App\Database;
use App\Export;

class ReportsController
{
    /**
     * Estados que cuentan como "venta pagada".
     * Excluye PENDIENTE, CANCELADO, REEMBOLSADO.
     */
    private const PAID_STATUSES = [
        'PAGADO', 'PREPARANDO', 'LISTO_RETIRO', 'ENTREGADO', 'AGENDADO', 'COMPLETADO'
    ];

    /**
     * Resuelve el rango de fechas desde $_GET (from/to, formato YYYY-MM-DD).
     * Default: from = primer día del mes actual, to = hoy.
     * Si el valor no matchea el regex se usa el default correspondiente.
     *
     * @return array{0:string,1:string} [$from, $to]
     */
    private function dateRange(): array
    {
        $rx = '/^\d{4}-\d{2}-\d{2}$/';

        $from = $_GET['from'] ?? '';
        $to   = $_GET['to'] ?? '';

        if (!is_string($from) || !preg_match($rx, $from)) {
            $from = date('Y-m-01');
        }
        if (!is_string($to) || !preg_match($rx, $to)) {
            $to = date('Y-m-d');
        }

        return [$from, $to];
    }

    /**
     * Placeholders SQL del filtro de rango sobre una columna dada.
     * Incluye el día 'to' completo: col >= ? AND col < (? + INTERVAL 1 DAY).
     */
    private function rangeClause(string $column): string
    {
        return "$column >= ? AND $column < (? + INTERVAL 1 DAY)";
    }

    /**
     * Salida unificada: CSV si format=csv, si no Response::success.
     */
    private function output(array $rows, string $csvName): void
    {
        if (($_GET['format'] ?? '') === 'csv') {
            Export::csv($rows, $csvName);
        }
        Response::success($rows);
    }

    /**
     * Cláusula IN (?, ?, ...) para los estados pagados.
     */
    private function paidStatusPlaceholders(): string
    {
        return implode(',', array_fill(0, count(self::PAID_STATUSES), '?'));
    }

    /**
     * GET /reports/overview - KPIs del rango.
     */
    public function overview(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();

        $paidIn  = $this->paidStatusPlaceholders();
        $range   = $this->rangeClause('created_at');

        // KPIs de ventas pagadas en el rango.
        $sql = "
            SELECT
                COALESCE(SUM(total), 0)      AS total_ventas,
                COUNT(*)                     AS n_ordenes,
                COALESCE(SUM(descuento), 0)  AS total_descuentos
            FROM orders
            WHERE status IN ($paidIn) AND $range
        ";
        $params = array_merge(self::PAID_STATUSES, [$from, $to]);
        $row = $db->fetch($sql, $params) ?? [];

        $totalVentas = (float)($row['total_ventas'] ?? 0);
        $nOrdenes    = (int)($row['n_ordenes'] ?? 0);
        $totalDesc   = (float)($row['total_descuentos'] ?? 0);
        $ticket      = $nOrdenes > 0 ? $totalVentas / $nOrdenes : 0;

        // Abonos de Reservo efectivamente cobrados en el rango.
        //  - Se cuentan por paid_at (momento de la captura), no por created_at
        //    (momento en que el paciente entró a Webpay): un pago iniciado el 31
        //    y capturado el 1 pertenece al mes en que lo liquida la cartola.
        //  - PAGADO_SIN_CITA también entra: el dinero se cobró aunque la cita
        //    haya fallado. Se informa aparte para poder descontarlo si se devuelve.
        $reservo = $db->fetch(
            "SELECT COALESCE(SUM(amount), 0) AS abonos,
                    COALESCE(SUM(CASE WHEN status = 'PAGADO_SIN_CITA' THEN amount ELSE 0 END), 0) AS abonos_sin_cita
             FROM reservo_bookings
             WHERE status IN ('PAGADO','PAGADO_SIN_CITA')
               AND amount > 0
               AND " . $this->rangeClause('COALESCE(paid_at, created_at)'),
            [$from, $to]
        );
        $abonosReservo = (float)($reservo['abonos'] ?? 0);
        $abonosSinCita = (float)($reservo['abonos_sin_cita'] ?? 0);

        // Comisiones aún no pagadas (independiente del rango por definición de pendiente).
        $com = $db->fetch(
            "SELECT COALESCE(SUM(monto_comision), 0) AS pendientes
             FROM commissions
             WHERE estado IN ('pendiente', 'aprobada')"
        );
        $comisionesPendientes = (float)($com['pendientes'] ?? 0);

        Response::success([
            'total_ventas'          => $totalVentas,
            'n_ordenes'             => $nOrdenes,
            'ticket_promedio'       => $ticket,
            'total_descuentos'      => $totalDesc,
            'abonos_reservo'        => $abonosReservo,
            'abonos_sin_cita'       => $abonosSinCita,
            'comisiones_pendientes' => $comisionesPendientes,
            'periodo'               => ['from' => $from, 'to' => $to],
        ]);
    }

    /**
     * GET /reports/sales - Serie temporal de ventas pagadas.
     */
    public function sales(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();

        $groupBy = $_GET['group_by'] ?? 'day';
        $formats = [
            'day'   => '%Y-%m-%d',
            'week'  => '%x-W%v',
            'month' => '%Y-%m',
        ];
        if (!isset($formats[$groupBy])) {
            $groupBy = 'day';
        }
        $format = $formats[$groupBy];

        $paidIn = $this->paidStatusPlaceholders();
        $range  = $this->rangeClause('COALESCE(paid_at, created_at)');

        $sql = "
            SELECT
                DATE_FORMAT(COALESCE(paid_at, created_at), '$format') AS periodo,
                COALESCE(SUM(total), 0)     AS total,
                COUNT(*)                    AS n_ordenes,
                COALESCE(AVG(total), 0)     AS ticket_promedio,
                COALESCE(SUM(descuento), 0) AS descuentos
            FROM orders
            WHERE status IN ($paidIn) AND $range
            GROUP BY periodo
            ORDER BY periodo
        ";
        $params = array_merge(self::PAID_STATUSES, [$from, $to]);
        $rows = $db->fetchAll($sql, $params);

        $this->output($rows, 'ventas.csv');
    }

    /**
     * GET /reports/top-treatments - Items más vendidos del rango.
     */
    public function topTreatments(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();

        $paidIn = $this->paidStatusPlaceholders();
        $range  = $this->rangeClause('o.created_at');

        $params = self::PAID_STATUSES;
        $params[] = $from;
        $params[] = $to;

        $typeClause = '';
        if (!empty($_GET['type'])) {
            $typeClause = ' AND oi.type = ?';
            $params[]   = $_GET['type'];
        }

        // LIMIT casteado a entero y concatenado de forma segura (algunos drivers
        // no aceptan placeholder en LIMIT).
        $limit = (int)($_GET['limit'] ?? 20);
        if ($limit < 1) {
            $limit = 20;
        }

        $sql = "
            SELECT
                oi.name                            AS name,
                oi.type                            AS type,
                SUM(oi.quantity)                   AS unidades,
                SUM(oi.price * oi.quantity)        AS ingresos
            FROM order_items oi
            JOIN orders o ON oi.order_id = o.id
            WHERE o.status IN ($paidIn) AND $range$typeClause
            GROUP BY oi.name, oi.type
            ORDER BY ingresos DESC
            LIMIT $limit
        ";
        $rows = $db->fetchAll($sql, $params);

        $this->output($rows, 'top-tratamientos.csv');
    }

    /**
     * GET /reports/conversion - Embudo de conversión del rango.
     */
    public function conversion(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();

        $range = $this->rangeClause('created_at');

        // Órdenes por status creadas en el rango.
        $porStatus = $db->fetchAll(
            "SELECT status, COUNT(*) AS n
             FROM orders
             WHERE $range
             GROUP BY status",
            [$from, $to]
        );

        $creadas = 0;
        $pagadas = 0;
        foreach ($porStatus as $r) {
            $n = (int)$r['n'];
            $creadas += $n;
            if (in_array($r['status'], self::PAID_STATUSES, true)) {
                $pagadas += $n;
            }
        }
        $tasaConversion = $creadas > 0 ? ($pagadas / $creadas) * 100 : 0;

        // Embudo de reservo_bookings por status en el rango. Las reservas
        // gratuitas (amount = 0) se separan: mezcladas con las cobradas inflaban
        // la lectura de conversión a pago, porque también se guardan como PAGADO.
        $reservo = $db->fetchAll(
            "SELECT status,
                    CASE WHEN amount > 0 THEN 'con_pago' ELSE 'gratis' END AS tipo,
                    COUNT(*) AS n
             FROM reservo_bookings
             WHERE $range
             GROUP BY status, tipo",
            [$from, $to]
        );

        Response::success([
            'creadas'         => $creadas,
            'pagadas'         => $pagadas,
            'tasa_conversion' => $tasaConversion,
            'por_status'      => $porStatus,
            'reservo'         => $reservo,
            'periodo'         => ['from' => $from, 'to' => $to],
        ]);
    }

    /**
     * GET /reports/sales-by-channel - Ventas pagadas agrupadas por canal.
     *
     * Para ser robusto a que la columna o.canal aún no exista, el canal se deriva
     * vía LEFT JOIN coupons con un CASE sobre c.categoria.
     */
    public function salesByChannel(): void
    {
        $db = Database::getInstance();
        [$from, $to] = $this->dateRange();

        $paidIn = $this->paidStatusPlaceholders();
        $range  = $this->rangeClause('o.created_at');

        $canalExpr = "
            CASE
                WHEN o.coupon_id IS NULL    THEN 'directo'
                WHEN c.categoria = 'afiliado' THEN 'afiliado'
                WHEN c.categoria = 'descuento' THEN 'promo'
                WHEN c.categoria = 'personal' THEN 'staff'
                ELSE 'cupon'
            END
        ";

        $sql = "
            SELECT
                $canalExpr             AS canal,
                COALESCE(SUM(o.total), 0) AS ingresos,
                COUNT(*)               AS n_ordenes
            FROM orders o
            LEFT JOIN coupons c ON o.coupon_id = c.id
            WHERE o.status IN ($paidIn) AND $range
            GROUP BY canal
            ORDER BY ingresos DESC
        ";
        $params = array_merge(self::PAID_STATUSES, [$from, $to]);
        $rows = $db->fetchAll($sql, $params);

        $this->output($rows, 'ventas-canal.csv');
    }
}
