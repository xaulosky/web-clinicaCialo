<?php
/**
 * JWT Authentication Handler
 */

namespace App;

class Auth
{
    private static array $config;

    public static function init(): void
    {
        self::$config = require __DIR__ . '/../config/config.php';
    }

    /**
     * Generar token JWT
     */
    public static function generateToken(array $payload): string
    {
        self::init();
        
        $header = self::base64UrlEncode(json_encode([
            'typ' => 'JWT',
            'alg' => 'HS256'
        ]));

        $payload['iat'] = time();
        $payload['exp'] = time() + self::$config['jwt']['expiry'];
        
        $payloadEncoded = self::base64UrlEncode(json_encode($payload));
        
        $signature = self::base64UrlEncode(
            hash_hmac('sha256', "$header.$payloadEncoded", self::$config['jwt']['secret'], true)
        );

        return "$header.$payloadEncoded.$signature";
    }

    /**
     * Verificar y decodificar token
     */
    public static function verifyToken(string $token): ?array
    {
        self::init();
        
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return null;
        }

        [$header, $payload, $signature] = $parts;

        // Verificar firma
        $expectedSignature = self::base64UrlEncode(
            hash_hmac('sha256', "$header.$payload", self::$config['jwt']['secret'], true)
        );

        if (!hash_equals($expectedSignature, $signature)) {
            return null;
        }

        // Decodificar payload
        $data = json_decode(self::base64UrlDecode($payload), true);
        
        // Verificar expiración
        if (isset($data['exp']) && $data['exp'] < time()) {
            return null;
        }

        return $data;
    }

    /**
     * Obtener usuario del request actual
     */
    public static function getUser(): ?array
    {
        // Leer el header Authorization desde CUALQUIER variante de $_SERVER.
        // Bajo FastCGI/CGI Apache descarta HTTP_AUTHORIZATION salvo que el
        // .htaccess lo reenvíe, y con varios pases de rewrite puede llegar como
        // REDIRECT_HTTP_AUTHORIZATION o incluso REDIRECT_REDIRECT_HTTP_AUTHORIZATION.
        // Recorremos todas las claves que terminen en HTTP_AUTHORIZATION.
        $header = '';
        foreach ($_SERVER as $k => $v) {
            if ($k === 'HTTP_AUTHORIZATION') {
                $header = (string) $v;
                break; // preferimos la directa
            }
            if (str_ends_with($k, 'HTTP_AUTHORIZATION') && $v !== '') {
                $header = (string) $v;
            }
        }

        // Respaldo final: getallheaders() (lee los headers reales del request).
        if ($header === '' && function_exists('getallheaders')) {
            foreach (getallheaders() as $key => $value) {
                if (strcasecmp($key, 'Authorization') === 0) {
                    $header = $value;
                    break;
                }
            }
        }

        if (!preg_match('/Bearer\s+(.+)/i', $header, $matches)) {
            return null;
        }

        return self::verifyToken(trim($matches[1]));
    }

    /**
     * Requerir autenticación
     */
    public static function require(): array
    {
        $user = self::getUser();

        if (!$user) {
            Response::unauthorized('Token inválido o expirado');
        }

        return $user;
    }

    /**
     * Requerir que el usuario autenticado sea administrador.
     * Cierra el control de acceso de todos los endpoints de admin.
     */
    public static function requireAdmin(): array
    {
        $user = self::require();

        $isAdmin = (($user['is_admin'] ?? false) === true)
            || in_array($user['rol'] ?? '', ['admin', 'super_admin', 'editor'], true);

        if (!$isAdmin) {
            Response::forbidden('Acceso restringido a administradores');
        }

        return $user;
    }

    /**
     * Hash de contraseña
     */
    public static function hashPassword(string $password): string
    {
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
    }

    /**
     * Verificar contraseña
     */
    public static function verifyPassword(string $password, string $hash): bool
    {
        return password_verify($password, $hash);
    }

    private static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $data): string
    {
        return base64_decode(strtr($data, '-_', '+/'));
    }
}
