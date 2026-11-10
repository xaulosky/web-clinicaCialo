<?php

namespace App\Enums;

enum OrderStatus: string
{
    case PENDIENTE = 'PENDIENTE';
    case PAGADO = 'PAGADO';
    case PREPARANDO = 'PREPARANDO';
    case LISTO_RETIRO = 'LISTO_RETIRO';
    case ENTREGADO = 'ENTREGADO';
    case AGENDADO = 'AGENDADO';
    case COMPLETADO = 'COMPLETADO';
    case CANCELADO = 'CANCELADO';
    case REEMBOLSADO = 'REEMBOLSADO';
    case TIMEOUT = 'TIMEOUT';
    case ERROR = 'ERROR';
}
