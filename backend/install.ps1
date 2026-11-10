# Script de instalación para Cialo Backend
# Ejecutar en PowerShell como Administrador

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALADOR CIALO BACKEND" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar PHP
Write-Host "[1/5] Verificando PHP..." -ForegroundColor Yellow
try {
    $phpVersion = php -v 2>&1 | Select-Object -First 1
    Write-Host "  ✓ $phpVersion" -ForegroundColor Green
} catch {
    Write-Host "  ✗ PHP no encontrado" -ForegroundColor Red
    Write-Host "  Instala Laravel Herd: https://herd.laravel.com/" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Verificar Composer
Write-Host ""
Write-Host "[2/5] Verificando Composer..." -ForegroundColor Yellow
$composerPath = ""
try {
    $composerPath = (Get-Command composer).Source
    Write-Host "  ✓ Composer encontrado: $composerPath" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Composer no encontrado" -ForegroundColor Red
    Write-Host "  Descargando Composer..." -ForegroundColor Yellow
    
    try {
        Invoke-WebRequest -Uri "https://getcomposer.org/installer" -OutFile "composer-setup.php" -UseBasicParsing
        php composer-setup.php --quiet
        Remove-Item "composer-setup.php"
        
        if (Test-Path "composer.phar") {
            $composerPath = "php composer.phar"
            Write-Host "  ✓ Composer descargado localmente" -ForegroundColor Green
        } else {
            throw "No se pudo descargar Composer"
        }
    } catch {
        Write-Host "  ✗ Error: $_" -ForegroundColor Red
        Read-Host "Presiona Enter para salir"
        exit 1
    }
}

# Instalar dependencias
Write-Host ""
Write-Host "[3/5] Instalando dependencias Laravel..." -ForegroundColor Yellow
Write-Host "  (Este proceso puede tardar 5-10 minutos)" -ForegroundColor Gray
Write-Host ""

try {
    if ($composerPath -eq "php composer.phar") {
        php composer.phar install --no-interaction --no-progress
    } else {
        & $composerPath install --no-interaction --no-progress
    }
    
    Write-Host "  ✓ Dependencias instaladas" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Error instalando dependencias: $_" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Verificar vendor/
Write-Host ""
Write-Host "[4/5] Verificando instalación..." -ForegroundColor Yellow
if (Test-Path "vendor/autoload.php") {
    Write-Host "  ✓ vendor/autoload.php encontrado" -ForegroundColor Green
} else {
    Write-Host "  ✗ vendor/autoload.php NO encontrado" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Configurar .env
Write-Host ""
Write-Host "[5/5] Configurando entorno..." -ForegroundColor Yellow

if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "  ✓ .env creado" -ForegroundColor Green
} else {
    Write-Host "  ℹ .env ya existe" -ForegroundColor Yellow
}

# Generar APP_KEY
Write-Host ""
Write-Host "Generando APP_KEY..." -ForegroundColor Yellow
try {
    php artisan key:generate --quiet
    Write-Host "  ✓ APP_KEY generado" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Error generando APP_KEY: $_" -ForegroundColor Red
}

# Resumen
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ¡INSTALACIÓN COMPLETADA!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "  1. Crea la BD en MySQL:" -ForegroundColor White
Write-Host "     CREATE DATABASE cialo_test;" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Ejecuta migraciones:" -ForegroundColor White
Write-Host "     php artisan migrate" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Datos de prueba:" -ForegroundColor White
Write-Host "     php artisan db:seed --class=TestDataSeeder" -ForegroundColor Gray
Write-Host ""
Write-Host "  4. Visita: http://cialo-backend.test" -ForegroundColor White
Write-Host ""
Write-Host "Credenciales:" -ForegroundColor Cyan
Write-Host "  Admin: admin@cialo.cl / admin123" -ForegroundColor White
Write-Host ""

Read-Host "Presiona Enter para salir"
