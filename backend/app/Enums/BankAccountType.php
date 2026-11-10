<?php

namespace App\Enums;

enum BankAccountType: string
{
    case CORRIENTE = 'corriente';
    case VISTA = 'vista';
    case AHORRO = 'ahorro';
}
