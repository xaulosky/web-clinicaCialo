<?php

namespace App\Enums;

enum OrderItemType: string
{
    case PRODUCTO = 'producto';
    case TRATAMIENTO = 'tratamiento';
    case CONSULTA = 'consulta';
}
