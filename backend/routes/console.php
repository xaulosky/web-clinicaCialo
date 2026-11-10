<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment('Inspiration is ephemeral.');
})->purpose('Display an inspiring quote');
