<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\AdminUser;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Coupon;
use App\Models\Affiliate;

class TestDataSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
        ]);

        // Crear usuario de prueba
        $user = User::create([
            'email' => 'cliente@test.com',
            'password' => Hash::make('password123'),
            'nombre' => 'Juan',
            'apellido' => 'Pérez',
            'telefono' => '+56912345678',
        ]);

        // Crear cupón de prueba
        $coupon = Coupon::create([
            'code' => 'BIENVENIDO20',
            'categoria' => 'descuento',
            'tipo' => 'porcentaje',
            'valor' => 20,
            'descripcion' => '20% de descuento en tu primera compra',
            'min_compra' => 30000,
            'max_usos' => 100,
            'usos_actuales' => 0,
            'fecha_inicio' => now(),
            'fecha_fin' => now()->addMonths(3),
            'activo' => true,
        ]);

        // Crear afiliado de prueba
        $affiliate = Affiliate::create([
            'user_id' => $user->id,
            'codigo_afiliado' => 'Juan2024',
            'nombre' => 'Juan Pérez',
            'email' => 'cliente@test.com',
            'telefono' => '+56912345678',
            'rut' => '12.345.678-9',
            'banco' => 'Banco de Chile',
            'tipo_cuenta' => 'corriente',
            'numero_cuenta' => '123456789',
            'comision_default' => 10,
            'activo' => true,
        ]);

        // Crear orden de prueba
        $order = Order::create([
            'order_number' => 'CIALO-2024-0001',
            'retiro_code' => 'ABC123',
            'status' => 'PAGADO',
            'subtotal' => 45000,
            'total' => 45000,
            'customer_name' => 'Juan Pérez',
            'customer_email' => 'cliente@test.com',
            'customer_phone' => '+56912345678',
            'customer_rut' => '12.345.678-9',
            'delivery_method' => 'retiro',
            'user_id' => $user->id,
            'paid_at' => now(),
        ]);

        // Items de la orden
        OrderItem::create([
            'order_id' => $order->id,
            'name' => 'Hydrafacial Completo',
            'price' => 45000,
            'quantity' => 1,
            'type' => 'tratamiento',
            'image' => '/tratamientos/hydrafacial.jpg',
        ]);

        // Crear más órdenes para tener datos
        for ($i = 2; $i <= 5; $i++) {
            $statuses = ['PENDIENTE', 'PAGADO', 'AGENDADO', 'COMPLETADO'];
            $status = $statuses[array_rand($statuses)];
            
            $newOrder = Order::create([
                'order_number' => 'CIALO-2024-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'status' => $status,
                'subtotal' => rand(30000, 100000),
                'total' => rand(30000, 100000),
                'customer_name' => 'Cliente ' . $i,
                'customer_email' => 'cliente' . $i . '@test.com',
                'customer_phone' => '+569' . rand(10000000, 99999999),
                'delivery_method' => 'retiro',
                'paid_at' => in_array($status, ['PAGADO', 'AGENDADO', 'COMPLETADO']) ? now() : null,
            ]);

            OrderItem::create([
                'order_id' => $newOrder->id,
                'name' => 'Tratamiento ' . $i,
                'price' => $newOrder->total,
                'quantity' => 1,
                'type' => ['producto', 'tratamiento', 'consulta'][array_rand(['producto', 'tratamiento', 'consulta'])],
            ]);
        }

        $this->command->info('✅ Datos de prueba creados exitosamente!');
        $this->command->info('📌 Admin: admin@cialo.cl / admin123');
        $this->command->info('📌 Usuario: cliente@test.com / password123');
    }
}
