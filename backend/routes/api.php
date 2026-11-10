<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TransbankController;
use App\Http\Controllers\Api\CouponController;
use App\Http\Controllers\Api\AffiliateController;
use App\Http\Controllers\Api\CommissionController;
use App\Http\Controllers\Api\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Auth público
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/admin-login', [AdminAuthController::class, 'adminLogin']);

// Contacto público
Route::post('/contact', [ContactController::class, 'submit']);

// Transbank público (return URL)
Route::match(['get', 'post'], '/transbank/confirm', [TransbankController::class, 'confirm']);

// Cupones - validación pública
Route::post('/coupons/validate', [CouponController::class, 'validate']);

// Orders públicos (para guest checkout y tracking)
Route::post('/orders/guest', [OrderController::class, 'store']);
Route::get('/orders/number/{number}', [OrderController::class, 'showByNumber']);
Route::get('/orders/retiro/{code}', [OrderController::class, 'showByRetiroCode']);

// Transbank
Route::post('/transbank/init', [TransbankController::class, 'init']);
Route::get('/transbank/status/{token}', [TransbankController::class, 'status']);

// Auth protegido (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/change-password', [AuthController::class, 'changePassword']);
});

// JWT Auth para usuarios
Route::middleware(['auth:api'])->group(function () {
    Route::get('/auth/me-jwt', [AuthController::class, 'me']);
    Route::post('/auth/logout-jwt', [AuthController::class, 'logout']);
    Route::post('/auth/change-password-jwt', [AuthController::class, 'changePassword']);

    // Orders autenticadas
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::put('/orders/{id}', [OrderController::class, 'update']);
    Route::get('/orders/email/{email}', [OrderController::class, 'getByEmail']);
});

// Admin routes (JWT + is_admin)
Route::middleware(['auth:api', 'ensure_admin'])->group(function () {
    // Coupons admin
    Route::get('/coupons', [CouponController::class, 'index']);
    Route::post('/coupons', [CouponController::class, 'store']);
    Route::get('/coupons/{id}', [CouponController::class, 'show']);
    Route::put('/coupons/{id}', [CouponController::class, 'update']);
    Route::delete('/coupons/{id}', [CouponController::class, 'destroy']);
    Route::post('/coupons/use', [CouponController::class, 'use']);

    // Affiliates admin
    Route::get('/affiliates', [AffiliateController::class, 'index']);
    Route::post('/affiliates', [AffiliateController::class, 'store']);
    Route::get('/affiliates/{id}', [AffiliateController::class, 'show']);
    Route::put('/affiliates/{id}', [AffiliateController::class, 'update']);
    Route::delete('/affiliates/{id}', [AffiliateController::class, 'destroy']);
    Route::get('/affiliates/stats/dashboard', [AffiliateController::class, 'stats']);

    // Commissions admin
    Route::get('/commissions', [CommissionController::class, 'index']);
    Route::get('/commissions/{id}', [CommissionController::class, 'show']);
    Route::post('/commissions/{id}/approve', [CommissionController::class, 'approve']);
    Route::post('/commissions/{id}/pay', [CommissionController::class, 'pay']);
    Route::post('/commissions/{id}/cancel', [CommissionController::class, 'cancel']);
    Route::post('/commissions/bulk-pay', [CommissionController::class, 'bulkPay']);
    Route::get('/commissions/stats/dashboard', [CommissionController::class, 'stats']);
});
