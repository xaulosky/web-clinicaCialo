<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('affiliates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable();
            $table->string('codigo_afiliado', 20)->unique();
            $table->string('nombre', 100);
            $table->string('email', 255);
            $table->string('telefono', 20)->nullable();
            $table->string('rut', 20)->nullable();
            $table->string('banco', 50)->nullable();
            $table->enum('tipo_cuenta', ['corriente', 'vista', 'ahorro'])->nullable();
            $table->string('numero_cuenta', 50)->nullable();
            $table->decimal('comision_default', 5, 2)->default(10.00);
            $table->decimal('total_ventas', 12, 2)->default(0);
            $table->decimal('total_comisiones', 12, 2)->default(0);
            $table->decimal('comisiones_pagadas', 12, 2)->default(0);
            $table->boolean('activo')->default(true);
            $table->timestamps();

            $table->index('user_id');
            $table->index('codigo_afiliado');
            $table->index('activo');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('affiliates');
    }
};
