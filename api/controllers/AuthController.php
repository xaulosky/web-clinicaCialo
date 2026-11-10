<?php
/**
 * Auth Controller
 */

namespace App\Controllers;

use App\Response;
use App\Validator;
use App\Auth;
use App\Models\User;

class AuthController
{
    private User $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    /**
     * POST /api/auth/register - Registrar usuario
     */
    public function register(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $validator = new Validator($data);
        $validator
            ->required('email')
            ->email('email')
            ->required('password')
            ->minLength('password', 6, 'La contraseña debe tener al menos 6 caracteres')
            ->required('nombre')
            ->required('apellido')
            ->validate();
        
        // Verificar si el email ya existe
        if ($this->userModel->emailExists($data['email'])) {
            Response::error('El email ya está registrado', 409);
        }
        
        $user = $this->userModel->create($data);
        
        $token = Auth::generateToken([
            'id' => $user['id'],
            'email' => $user['email'],
            'nombre' => $user['nombre']
        ]);
        
        Response::success([
            'user' => $user,
            'token' => $token
        ], 'Usuario registrado exitosamente', 201);
    }

    /**
     * POST /api/auth/login - Iniciar sesión
     */
    public function login(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $validator = new Validator($data);
        $validator
            ->required('email')
            ->email('email')
            ->required('password')
            ->validate();
        
        $result = $this->userModel->authenticate($data['email'], $data['password']);
        
        if (!$result) {
            Response::error('Credenciales inválidas', 401);
        }
        
        Response::success($result, 'Inicio de sesión exitoso');
    }

    /**
     * GET /api/auth/me - Obtener usuario actual
     */
    public function me(): void
    {
        $userData = Auth::require();
        
        $user = $this->userModel->findById($userData['id']);
        
        if (!$user) {
            Response::notFound('Usuario no encontrado');
        }
        
        Response::success($user);
    }

    /**
     * POST /api/auth/logout - Cerrar sesión (client-side solo)
     */
    public function logout(): void
    {
        // JWT es stateless, el logout se maneja en el cliente
        Response::success(null, 'Sesión cerrada');
    }

    /**
     * PUT /api/auth/profile - Actualizar perfil
     */
    public function updateProfile(): void
    {
        $userData = Auth::require();
        
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $user = $this->userModel->update($userData['id'], $data);
        
        Response::success($user, 'Perfil actualizado');
    }

    /**
     * POST /api/auth/change-password - Cambiar contraseña
     */
    public function changePassword(): void
    {
        $userData = Auth::require();
        
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $validator = new Validator($data);
        $validator
            ->required('currentPassword', 'La contraseña actual es requerida')
            ->required('newPassword', 'La nueva contraseña es requerida')
            ->minLength('newPassword', 6, 'La contraseña debe tener al menos 6 caracteres')
            ->validate();
        
        // Verificar contraseña actual
        $user = $this->userModel->findByEmail($userData['email']);
        
        if (!$user || !Auth::verifyPassword($data['currentPassword'], $user['password'])) {
            Response::error('La contraseña actual es incorrecta', 401);
        }
        
        // Actualizar contraseña
        $this->userModel->updatePassword($userData['id'], $data['newPassword']);
        
        Response::success(null, 'Contraseña actualizada correctamente');
    }

    /**
     * POST /api/auth/admin-login - Login para Panel Admin
     */
    public function adminLogin(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $validator = new Validator($data);
        $validator
            ->required('email')
            ->email('email')
            ->required('password')
            ->validate();
        
        // Buscar admin en la tabla admin_users
        $config = require __DIR__ . '/../config/config.php';
        $pdo = new \PDO(
            "mysql:host={$config['db']['host']};dbname={$config['db']['name']};charset={$config['db']['charset']}",
            $config['db']['user'],
            $config['db']['pass']
        );
        
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = ? AND activo = 1 LIMIT 1");
        $stmt->execute([$data['email']]);
        $admin = $stmt->fetch(\PDO::FETCH_ASSOC);
        
        if (!$admin || !password_verify($data['password'], $admin['password'])) {
            Response::error('Credenciales inválidas', 401);
        }
        
        // Actualizar último acceso
        $stmt = $pdo->prepare("UPDATE admin_users SET ultimo_acceso = NOW() WHERE id = ?");
        $stmt->execute([$admin['id']]);
        
        // Generar token JWT
        $token = Auth::generateToken([
            'id' => $admin['id'],
            'email' => $admin['email'],
            'nombre' => $admin['nombre'],
            'rol' => $admin['rol'],
            'is_admin' => true
        ]);
        
        Response::success([
            'user' => [
                'id' => $admin['id'],
                'email' => $admin['email'],
                'nombre' => $admin['nombre'],
                'rol' => $admin['rol']
            ],
            'token' => $token
        ], 'Acceso concedido');
    }
}
