<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasUuid;

class Order extends Model
{
    use HasFactory, HasUuid;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'order_number',
        'retiro_code',
        'status',
        'subtotal',
        'total',
        'coupon_id',
        'coupon_code',
        'descuento',
        'customer_name',
        'customer_email',
        'customer_phone',
        'customer_rut',
        'delivery_method',
        'transaction_id',
        'paid_at',
        'authorization_code',
        'card_number',
        'user_id',
    ];

    protected $casts = [
        'status' => \App\Enums\OrderStatus::class,
        'subtotal' => 'decimal:2',
        'total' => 'decimal:2',
        'descuento' => 'decimal:2',
        'paid_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class, 'coupon_id', 'id');
    }

    public function commission()
    {
        return $this->hasOne(Commission::class, 'order_id', 'id');
    }
}
