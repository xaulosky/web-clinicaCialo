<?php

return [
    'commerce_code' => env('TRANSBANK_COMMERCE_CODE', '597053031531'),
    'api_key' => env('TRANSBANK_API_KEY', '51ab5aed-ec8f-40ac-b38b-ebb137798e2f'),
    'environment' => env('TRANSBANK_ENVIRONMENT', 'production'),
    'return_url' => env('TRANSBANK_RETURN_URL', env('APP_URL') . '/api/transbank/confirm'),
];
