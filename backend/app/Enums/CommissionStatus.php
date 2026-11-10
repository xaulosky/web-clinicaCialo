<?php

namespace App\Enums;

enum CommissionStatus: string
{
    case PENDIENTE = 'pendiente';
    case APROBADA = 'aprobada';
    case PAGADA = 'pagada';
    case CANCELADA = 'cancelada';
}
