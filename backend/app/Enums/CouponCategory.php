<?php

namespace App\Enums;

enum CouponCategory: string
{
    case DESCUENTO = 'descuento';
    case PERSONAL = 'personal';
    case AFILIADO = 'afiliado';
}
