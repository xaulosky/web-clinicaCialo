<?php
// api/index.php
// Router principal

// 1. Configuración de errores: nunca mostrar detalles al cliente
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Debug de request: apagado en producción. Poner true solo para diagnosticar.
define('API_DEBUG', false);

// 2. Logging a archivo (bloqueado por .htaccess)
$logFile = __DIR__ . '/debug.log';
function serverLog($message, $force = false) {
    if (!API_DEBUG && !$force) return;
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    @file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

// 3. Handler de shutdown (captura errores fatales) — sin filtrar internals
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        serverLog("FATAL: {$error['message']} in {$error['file']}:{$error['line']}", true);
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => 'Error interno del servidor'
            ]);
        }
    }
});

// 4. Handler de errores standard
set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return;
    throw new \ErrorException($message, 0, $severity, $file, $line);
});

try {
    // 5. CORS con allowlist (un solo lugar, sin wildcard)
    $allowedOrigins = [
        'https://cialo.cl',
        'https://www.cialo.cl',
        'http://localhost:3000',
    ];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Vary: Origin');
        header('Access-Control-Allow-Credentials: true');
    }
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }

    // 5.1 Composer Autoloader (Transbank SDK, getallheaders)
    $composerAutoload = __DIR__ . '/vendor/autoload.php';
    if (file_exists($composerAutoload)) {
        require_once $composerAutoload;
    }

    // 6. Autoloader de clases propias (App\)
    spl_autoload_register(function ($class) {
        $prefix = 'App\\';
        $baseDir = __DIR__ . '/';
        $len = strlen($prefix);
        if (strncmp($prefix, $class, $len) !== 0) return;

        $relativeClass = substr($class, $len);
        $namespaceMap = [
            'Controllers\\' => 'controllers/',
            'Models\\' => 'models/',
        ];

        foreach ($namespaceMap as $ns => $dir) {
            if (strpos($relativeClass, $ns) === 0) {
                $relativeClass = $dir . substr($relativeClass, strlen($ns));
                break;
            }
        }

        if (strpos($relativeClass, '/') === false) {
            $relativeClass = 'src/' . $relativeClass;
        }

        $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
        if (file_exists($file)) {
            require $file;
        } else {
            serverLog("Autoload Failed: $file");
        }
    });

    // 7. Router
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = preg_replace('#^/api#', '', $uri);
    $uri = '/' . trim($uri, '/');
    $method = $_SERVER['REQUEST_METHOD'];

    serverLog("Routing: $method $uri");

    // Cada ruta: [Controlador, método, auth?]  auth: 'admin' | 'auth' | null
    $routes = [
        'GET /health' => ['App\\Controllers\\HealthController', 'index'],

        'GET /orders' => ['App\\Controllers\\OrderController', 'getAll', 'admin'],
        'POST /orders' => ['App\\Controllers\\OrderController', 'create'],
        'GET /orders/{id}' => ['App\\Controllers\\OrderController', 'getById'],
        'PUT /orders/{id}' => ['App\\Controllers\\OrderController', 'update', 'admin'],
        'GET /orders/email/{email}' => ['App\\Controllers\\OrderController', 'getByEmail', 'admin'],

        'POST /auth/login' => ['App\\Controllers\\AuthController', 'login'],
        'POST /auth/register' => ['App\\Controllers\\AuthController', 'register'],
        'GET /auth/me' => ['App\\Controllers\\AuthController', 'me'],
        'POST /auth/logout' => ['App\\Controllers\\AuthController', 'logout'],
        'PUT /auth/profile' => ['App\\Controllers\\AuthController', 'updateProfile'],
        'POST /auth/change-password' => ['App\\Controllers\\AuthController', 'changePassword'],
        'POST /auth/admin-login' => ['App\\Controllers\\AuthController', 'adminLogin'],

        // Transbank
        'POST /transbank/init' => ['App\\Controllers\\TransbankController', 'init'],
        'POST /transbank/confirm' => ['App\\Controllers\\TransbankController', 'confirm'],
        'GET /transbank/confirm' => ['App\\Controllers\\TransbankController', 'confirm'],
        'GET /transbank/status/{token}' => ['App\\Controllers\\TransbankController', 'status'],

        // Coupons (index/store/show/update/destroy exigen admin dentro del controller)
        'GET /coupons' => ['App\\Controllers\\CouponsController', 'index', 'admin'],
        'POST /coupons' => ['App\\Controllers\\CouponsController', 'store', 'admin'],
        'GET /coupons/{id}' => ['App\\Controllers\\CouponsController', 'show', 'admin'],
        'PUT /coupons/{id}' => ['App\\Controllers\\CouponsController', 'update', 'admin'],
        'DELETE /coupons/{id}' => ['App\\Controllers\\CouponsController', 'destroy', 'admin'],
        'GET /coupons/validate/{code}' => ['App\\Controllers\\CouponsController', 'validate'],
        'POST /coupons/validate' => ['App\\Controllers\\CouponsController', 'validate'],
        'POST /coupons/use/{id}' => ['App\\Controllers\\CouponsController', 'use'],

        // Affiliates (Admin)
        'GET /affiliates' => ['App\\Controllers\\AffiliatesController', 'index', 'admin'],
        'GET /affiliates/stats' => ['App\\Controllers\\AffiliatesController', 'stats', 'admin'],
        'POST /affiliates' => ['App\\Controllers\\AffiliatesController', 'store', 'admin'],
        'GET /affiliates/{id}' => ['App\\Controllers\\AffiliatesController', 'show', 'admin'],
        'PUT /affiliates/{id}' => ['App\\Controllers\\AffiliatesController', 'update', 'admin'],
        'DELETE /affiliates/{id}' => ['App\\Controllers\\AffiliatesController', 'destroy', 'admin'],

        // Commissions (Admin)
        'GET /commissions' => ['App\\Controllers\\CommissionsController', 'index', 'admin'],
        'GET /commissions/stats' => ['App\\Controllers\\CommissionsController', 'stats', 'admin'],
        'GET /commissions/{id}' => ['App\\Controllers\\CommissionsController', 'show', 'admin'],
        'POST /commissions/{id}/approve' => ['App\\Controllers\\CommissionsController', 'approve', 'admin'],
        'POST /commissions/{id}/pay' => ['App\\Controllers\\CommissionsController', 'pay', 'admin'],
        'POST /commissions/{id}/cancel' => ['App\\Controllers\\CommissionsController', 'cancel', 'admin'],
        'POST /commissions/bulk-pay' => ['App\\Controllers\\CommissionsController', 'bulkPay', 'admin'],

        // Reports (Admin) — nuevo módulo de reportería
        'GET /reports/sales' => ['App\\Controllers\\ReportsController', 'sales', 'admin'],
        'GET /reports/top-treatments' => ['App\\Controllers\\ReportsController', 'topTreatments', 'admin'],
        'GET /reports/conversion' => ['App\\Controllers\\ReportsController', 'conversion', 'admin'],
        'GET /reports/sales-by-channel' => ['App\\Controllers\\ReportsController', 'salesByChannel', 'admin'],
        'GET /reports/overview' => ['App\\Controllers\\ReportsController', 'overview', 'admin'],

        // Analytics — ingest público + agregados admin
        'POST /events' => ['App\\Controllers\\AnalyticsController', 'ingest'],
        'GET /analytics/overview' => ['App\\Controllers\\AnalyticsController', 'overview', 'admin'],
        'GET /analytics/top-pages' => ['App\\Controllers\\AnalyticsController', 'topPages', 'admin'],
        'GET /analytics/top-treatments' => ['App\\Controllers\\AnalyticsController', 'topTreatments', 'admin'],
        'GET /analytics/funnel' => ['App\\Controllers\\AnalyticsController', 'funnel', 'admin'],
        'GET /analytics/sources' => ['App\\Controllers\\AnalyticsController', 'sources', 'admin'],
        'GET /analytics/searches' => ['App\\Controllers\\AnalyticsController', 'searches', 'admin'],

        // Contact
        'POST /contact' => ['App\\Controllers\\ContactController', 'submit'],
        'GET /contacts' => ['App\\Controllers\\ContactController', 'index', 'admin'],
        'PUT /contacts/{id}' => ['App\\Controllers\\ContactController', 'update', 'admin'],

        // Careers — Trabaja con Nosotros
        'POST /careers' => ['App\\Controllers\\CareersController', 'submit'],
        'GET /careers/cv/{id}' => ['App\\Controllers\\CareersController', 'downloadCv', 'admin'],

        // Gift Cards
        'POST /giftcard' => ['App\\Controllers\\GiftCardController', 'submit'],
        'POST /giftcard/prepare' => ['App\\Controllers\\GiftCardController', 'prepare'],
        'GET /giftcards' => ['App\\Controllers\\GiftCardController', 'index', 'admin'],

        // Reservo (scraping directo de reservo.cl desde este backend)
        // Público: solo lo que la web necesita para PINTAR el agendador.
        'GET /reservo/agenda-info' => ['App\\Controllers\\ReservoController', 'agendaInfo'],
        'GET /reservo/agendables' => ['App\\Controllers\\ReservoController', 'agendables'],
        'GET /reservo/slots' => ['App\\Controllers\\ReservoController', 'slots'],
        'GET /reservo/dias-disponibles' => ['App\\Controllers\\ReservoController', 'diasDisponibles'],

        // Interno: metadatos de la operación (ids de box, catálogo completo,
        // ocupación de la agenda). La web no los usa; expuestos daban a
        // cualquiera los ids necesarios para escribir en la agenda real.
        'GET /reservo/servicios' => ['App\\Controllers\\ReservoController', 'servicios', 'admin'],
        'GET /reservo/agendas' => ['App\\Controllers\\ReservoController', 'agendas', 'admin'],
        'GET /reservo/disponibilidad' => ['App\\Controllers\\ReservoController', 'disponibilidad', 'admin'],

        // ESCRITURA DIRECTA en la agenda de reservo.cl, sin pago de por medio.
        // Estaba abierta al público: con los ids de box (que /reservo/agendas
        // entregaba sin autenticación) cualquiera podía crear citas reales
        // gratis y saturar la agenda. Solo administración.
        'POST /reservo/cita' => ['App\\Controllers\\ReservoController', 'crearCita', 'admin'],
        'POST /reservo/pago/simular' => ['App\\Controllers\\ReservoController', 'simular', 'admin'],

        // Reservo - pago del abono Webpay + creación de cita
        'POST /reservo/pago/init' => ['App\\Controllers\\ReservoBookingController', 'init'],
        'GET /reservo/pago/confirm' => ['App\\Controllers\\ReservoBookingController', 'confirm'],
        'POST /reservo/pago/confirm' => ['App\\Controllers\\ReservoBookingController', 'confirm'],
        'POST /reservo/eval-gratis' => ['App\\Controllers\\ReservoBookingController', 'agendarEvalGratis'],

        // Reservo - administración de las reservas cobradas
        'GET /reservo/bookings' => ['App\\Controllers\\ReservoBookingsAdminController', 'index', 'admin'],
        'GET /reservo/bookings/resumen' => ['App\\Controllers\\ReservoBookingsAdminController', 'resumen', 'admin'],
        'POST /reservo/bookings/{id}/reintentar' => ['App\\Controllers\\ReservoBookingsAdminController', 'reintentar', 'admin'],
        'POST /reservo/bookings/{id}/resolver' => ['App\\Controllers\\ReservoBookingsAdminController', 'resolver', 'admin'],
    ];

    $matched = false;
    foreach ($routes as $route => $handler) {
        [$rMethod, $rPath] = explode(' ', $route, 2);
        if ($rMethod !== $method) continue;

        $pattern = '#^' . preg_replace('/\{(\w+)\}/', '([^/]+)', $rPath) . '$#';

        if (preg_match($pattern, $uri, $matches)) {
            array_shift($matches);

            $class = $handler[0];
            $fn = $handler[1];
            $auth = $handler[2] ?? null;

            // Middleware de autorización ANTES de instanciar el controlador
            if ($auth === 'admin') {
                \App\Auth::requireAdmin();
            } elseif ($auth === 'auth') {
                \App\Auth::require();
            }

            $controller = new $class();
            call_user_func_array([$controller, $fn], $matches);
            $matched = true;
            break;
        }
    }

    if (!$matched) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Not Found']);
    }

} catch (\Throwable $e) {
    serverLog("EXCEPTION: " . $e->getMessage() . " in " . $e->getFile() . ":" . $e->getLine(), true);
    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: application/json');
    }
    echo json_encode([
        'success' => false,
        'message' => 'Error interno del servidor'
    ]);
}
