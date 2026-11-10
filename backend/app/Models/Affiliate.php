<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class Affiliate extends Model
{
    use HasFactory, HasUuid;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $table = 'affiliates';

    protected $fillable = [
        'id',
        'user_id',
        'codigo_afiliado',
        'nombre',
        'email',
        'telefono',
        'rut',
        'banco',
        'tipo_cuenta',
        'numero_cuenta',
        'comision_default',
        'total_ventas',
        'total_comisiones',
        'comisiones_pagadas',
        'activo',
    ];

    protected $casts = [
        'tipo_cuenta' => \App\Enums\BankAccountType::class,
        'comision_default' => 'decimal:2',
        'total_ventas' => 'decimal:2',
        'total_comisiones' => 'decimal:2',
        'comisiones_pagadas' => 'decimal:2',
        'activo' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function commissions()
    {
        return $this->hasMany(Commission::class, 'affiliate_id', 'id');
    }

    public function coupons()
    {
        return $this->hasMany(Coupon::class, 'afiliado_id', 'id');
    }
}
