<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('order_number', 20)->unique();
            $table->string('retiro_code', 10)->nullable();
            $table->enum('status', ['PENDIENTE','PAGADO','PREPARANDO','LISTO_RETIRO','ENTREGADO','AGENDADO','COMPLETADO','CANCELADO','REEMBOLSADO','TIMEOUT','ERROR'])->default('PENDIENTE');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('total', 10, 2);
            $table->uuid('coupon_id')->nullable();
            $table->string('coupon_code', 50)->nullable();
            $table->decimal('descuento', 10, 2)->default(0);
            $table->string('customer_name', 200);
            $table->string('customer_email', 255);
            $table->string('customer_phone', 20);
            $table->string('customer_rut', 15)->nullable();
            $table->string('delivery_method', 20)->default('retiro');
            $table->string('transaction_id', 100)->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->string('authorization_code', 20)->nullable();
            $table->string('card_number', 10)->nullable();
            $table->uuid('user_id')->nullable();
            $table->timestamps();

            $table->index('order_number');
            $table->index('retiro_code');
            $table->index('transaction_id');
            $table->index('customer_email');
            $table->index('status');
            $table->index('coupon_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
