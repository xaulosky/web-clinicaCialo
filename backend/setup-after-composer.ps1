# Script de configuración post-composer
# Ejecutar en PowerShell desde la carpeta backend/

Write-Host "========================================" -ForegroundColor Green
Write-Host "  CONFIGURACIÓN POST-COMPOSER" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# 1. Configurar .env
Write-Host "[1/4] Configurando entorno..." -ForegroundColor Cyan
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "  ✓ .env creado" -ForegroundColor Green
} else {
    Write-Host "  ℹ .env ya existe" -ForegroundColor Yellow
}

# 2. Generar APP_KEY
Write-Host ""
Write-Host "[2/4] Generando APP_KEY..." -ForegroundColor Cyan
try {
    php artisan key:generate --quiet
    Write-Host "  ✓ APP_KEY generado" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Error: $_" -ForegroundColor Red
}

# 3. Verificar que vendor existe
Write-Host ""
Write-Host "[3/4] Verificando instalación..." -ForegroundColor Cyan
if (Test-Path "vendor/autoload.php") {
    Write-Host "  ✓ vendor/autoload.php existe" -ForegroundColor Green
} else {
    Write-Host "  ✗ vendor/autoload.php NO existe" -ForegroundColor Red
    exit 1
}

# 4. Crear directorios de storage si faltan
Write-Host ""
Write-Host "[4/4] Verificando directorios..." -ForegroundColor Cyan
$dirs = @(
    "storage/app/public",
    "storage/framework/cache",
    "storage/framework/sessions",
    "storage/framework/testing",
    "storage/framework/views",
    "storage/logs"
)

foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  ✓ Creado: $dir" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ¡CONFIGURACIÓN COMPLETADA!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "  1. Crea la base de datos 'cialo_test' en MySQL" -ForegroundColor White
Write-Host "  2. Ejecuta: php artisan migrate" -ForegroundColor White
Write-Host "  3. Ejecuta: php artisan db:seed --class=TestDataSeeder" -ForegroundColor White
Write-Host "  4. Inicia servidor: php artisan serve" -ForegroundColor White
Write-Host ""
Write-Host "O si usas Herd:" -ForegroundColor Cyan
Write-Host "  herd link cialo-backend" -ForegroundColor White
Write-Host "  Visita: http://cialo-backend.test" -ForegroundColor White
Write-Host ""

Read-Host "Presiona Enter para salir"
