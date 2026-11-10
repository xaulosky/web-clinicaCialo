<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\AdminUser;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin
        AdminUser::create([
            'email' => 'admin@cialo.cl',
            'password' => Hash::make('admin123'),
            'nombre' => 'Administrador',
            'rol' => 'super_admin',
            'activo' => true,
        ]);

        // Usuario de Pagos
        AdminUser::create([
            'email' => 'pagos@cialo.cl',
            'password' => Hash::make('CialoPagos2025'),
            'nombre' => 'Pagos',
            'rol' => 'admin',
            'activo' => true,
        ]);

        $this->command->info('✅ Usuarios admin creados');
    }
}
