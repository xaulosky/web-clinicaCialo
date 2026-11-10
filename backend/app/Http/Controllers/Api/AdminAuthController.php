<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AdminUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminAuthController extends Controller
{
    public function adminLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $admin = AdminUser::where('email', strtolower($request->email))
            ->where('activo', true)
            ->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Credenciales inválidas',
            ], 401);
        }

        $admin->ultimo_acceso = now();
        $admin->save();

        $token = JWTAuth::fromUser($admin, ['is_admin' => true]);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $admin->id,
                    'email' => $admin->email,
                    'nombre' => $admin->nombre,
                    'rol' => $admin->rol->value,
                ],
                'token' => $token,
            ],
            'message' => 'Acceso concedido',
        ]);
    }
}
