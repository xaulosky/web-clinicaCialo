<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('code', 50)->unique();
            $table->enum('categoria', ['descuento', 'personal', 'afiliado'])->default('descuento');
            $table->enum('tipo', ['porcentaje', 'monto'])->default('porcentaje');
            $table->decimal('valor', 10, 2);
            $table->string('descripcion', 255)->nullable();
            $table->decimal('monto_minimo', 10, 2)->nullable();
            $table->decimal('descuento_maximo', 10, 2)->nullable();
            $table->integer('usos_maximos')->nullable();
            $table->integer('usos_actuales')->default(0);
            $table->dateTime('fecha_inicio')->nullable();
            $table->dateTime('fecha_fin')->nullable();
            $table->uuid('afiliado_id')->nullable();
            $table->decimal('comision_porcentaje', 5, 2)->nullable();
            $table->boolean('activo')->default(true);
            $table->timestamps();

            $table->index('code');
            $table->index('activo');
            $table->index('categoria');
            $table->index('afiliado_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
