<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class Coupon extends Model
{
    use HasFactory, HasUuid;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'code',
        'categoria',
        'tipo',
        'valor',
        'descripcion',
        'monto_minimo',
        'descuento_maximo',
        'usos_maximos',
        'usos_actuales',
        'fecha_inicio',
        'fecha_fin',
        'afiliado_id',
        'comision_porcentaje',
        'activo',
    ];

    protected $casts = [
        'categoria' => \App\Enums\CouponCategory::class,
        'tipo' => \App\Enums\CouponType::class,
        'valor' => 'decimal:2',
        'monto_minimo' => 'decimal:2',
        'descuento_maximo' => 'decimal:2',
        'usos_maximos' => 'integer',
        'usos_actuales' => 'integer',
        'comision_porcentaje' => 'decimal:2',
        'activo' => 'boolean',
        'fecha_inicio' => 'datetime',
        'fecha_fin' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function affiliate()
    {
        return $this->belongsTo(Affiliate::class, 'afiliado_id', 'id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'coupon_id', 'id');
    }
}
