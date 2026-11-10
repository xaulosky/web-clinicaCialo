<?php
/**
 * User Model
 */

namespace App\Models;

use App\Database;
use App\Auth;

class User
{
    private Database $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Crear usuario
     */
    public function create(array $data): array
    {
        $id = Database::uuid();
        
        $this->db->query(
            "INSERT INTO users (id, email, password, nombre, apellido, telefono)
             VALUES (?, ?, ?, ?, ?, ?)",
            [
                $id,
                strtolower($data['email']),
                Auth::hashPassword($data['password']),
                $data['nombre'],
                $data['apellido'],
                $data['telefono'] ?? null
            ]
        );
        
        return $this->findById($id);
    }

    /**
     * Buscar por ID
     */
    public function findById(string $id): ?array
    {
        $user = $this->db->fetch("SELECT * FROM users WHERE id = ?", [$id]);
        
        if ($user) {
            unset($user['password']);
        }
        
        return $user;
    }

    /**
     * Buscar por email
     */
    public function findByEmail(string $email): ?array
    {
        return $this->db->fetch(
            "SELECT * FROM users WHERE email = ?",
            [strtolower($email)]
        );
    }

    /**
     * Verificar credenciales y retornar token
     */
    public function authenticate(string $email, string $password): ?array
    {
        $user = $this->findByEmail($email);
        
        if (!$user || !Auth::verifyPassword($password, $user['password'])) {
            return null;
        }
        
        $token = Auth::generateToken([
            'id' => $user['id'],
            'email' => $user['email'],
            'nombre' => $user['nombre']
        ]);
        
        unset($user['password']);
        
        return [
            'user' => $user,
            'token' => $token
        ];
    }

    /**
     * Actualizar usuario
     */
    public function update(string $id, array $data): ?array
    {
        $fields = [];
        $values = [];
        
        $allowedFields = ['nombre', 'apellido', 'telefono'];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "{$field} = ?";
                $values[] = $data[$field];
            }
        }
        
        if (isset($data['password'])) {
            $fields[] = "password = ?";
            $values[] = Auth::hashPassword($data['password']);
        }
        
        if (empty($fields)) {
            return $this->findById($id);
        }
        
        $values[] = $id;
        $sql = "UPDATE users SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
        
        $this->db->query($sql, $values);
        
        return $this->findById($id);
    }

    /**
     * Verificar si email existe
     */
    public function emailExists(string $email): bool
    {
        $result = $this->db->fetch(
            "SELECT id FROM users WHERE email = ?",
            [strtolower($email)]
        );
        
        return $result !== null;
    }

    /**
     * Actualizar contraseña
     */
    public function updatePassword(string $id, string $newPassword): bool
    {
        $this->db->query(
            "UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?",
            [Auth::hashPassword($newPassword), $id]
        );
        
        return true;
    }
}
