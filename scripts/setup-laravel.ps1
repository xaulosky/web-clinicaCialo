# Script de instalación Laravel + Filament para Cialo
# Ejecutar en PowerShell como Administrador

Write-Host "🚀 Instalando Laravel + Filament para Cialo..." -ForegroundColor Green

# 1. Crear proyecto Laravel
Write-Host "📦 Creando proyecto Laravel 11..." -ForegroundColor Yellow
composer create-project laravel/laravel backend 11.* --prefer-dist

# 2. Entrar al directorio
Set-Location backend

# 3. Instalar Filament
Write-Host "🔧 Instalando Filament v3..." -ForegroundColor Yellow
composer require filament/filament:"^3.2" -W
php artisan filament:install --panels

# 4. Instalar Sanctum
Write-Host "🔐 Instalando Laravel Sanctum..." -ForegroundColor Yellow
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# 5. Instalar Transbank SDK
Write-Host "💳 Instalando Transbank SDK..." -ForegroundColor Yellow
composer require transbank/transbank-sdk:^4.0

# 6. Copiar configuración de BD
Write-Host "⚙️ Configurando base de datos..." -ForegroundColor Yellow
Copy-Item ..\backend-config\.env .env -Force

# 7. Generar APP_KEY
php artisan key:generate

# 8. Crear migraciones
Write-Host "🗄️ Creando migraciones..." -ForegroundColor Yellow
php artisan make:migration create_uuid_extension
php artisan make:migration create_users_table
php artisan make:migration create_admin_users_table
php artisan make:migration create_orders_table
php artisan make:migration create_order_items_table
php artisan make:migration create_coupons_table
php artisan make:migration create_affiliates_table
php artisan make:migration create_commissions_table

Write-Host "✅ Instalación completada!" -ForegroundColor Green
Write-Host "📁 Proyecto creado en: backend/" -ForegroundColor Cyan
Write-Host "🚀 Iniciar servidor: cd backend && php artisan serve" -ForegroundColor Cyan