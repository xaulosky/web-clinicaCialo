<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('commissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('affiliate_id');
            $table->uuid('order_id');
            $table->uuid('coupon_id');
            $table->decimal('monto_venta', 12, 2);
            $table->decimal('porcentaje_comision', 5, 2);
            $table->decimal('monto_comision', 12, 2);
            $table->enum('estado', ['pendiente', 'aprobada', 'pagada', 'cancelada'])->default('pendiente');
            $table->dateTime('fecha_pago')->nullable();
            $table->text('notas')->nullable();
            $table->timestamps();

            $table->index('affiliate_id');
            $table->index('order_id');
            $table->index('estado');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('commissions');
    }
};
