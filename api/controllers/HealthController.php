<?php

namespace App\Controllers;

use App\Response;

class HealthController
{
    public function index(): void
    {
        Response::success(['ok' => true, 'time' => date('c')], 'API online');
    }
}
