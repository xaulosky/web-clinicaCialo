<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $token = JWTAuth::parseToken();
            $payload = $token->getPayload();

            if (!$payload->get('is_admin')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Acceso denegado. Se requieren permisos de administrador.',
                ], 403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Token inválido o expirado.',
            ], 401);
        }

        return $next($request);
    }
}
