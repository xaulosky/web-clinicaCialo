# Script de pruebas rápidas para Laravel Herd
# Ejecutar en PowerShell desde la carpeta backend/

Write-Host "🚀 Preparando entorno de pruebas para Clínica Cialo..." -ForegroundColor Green
Write-Host ""

# 1. Verificar que estamos en la carpeta correcta
if (-not (Test-Path "composer.json")) {
    Write-Host "❌ Error: No estás en la carpeta backend/" -ForegroundColor Red
    Write-Host "Por favor ejecuta este script desde: web-cialo/backend/" -ForegroundColor Yellow
    exit 1
}

# 2. Instalar dependencias
Write-Host "📦 Paso 1: Instalando dependencias..." -ForegroundColor Cyan
composer install --no-interaction --no-progress
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando dependencias" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
Write-Host ""

# 3. Configurar entorno
Write-Host "⚙️ Paso 2: Configurando entorno..." -ForegroundColor Cyan
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Archivo .env creado" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Archivo .env ya existe, conservando..." -ForegroundColor Yellow
}

# 4. Generar APP_KEY
Write-Host "🔑 Paso 3: Generando APP_KEY..." -ForegroundColor Cyan
php artisan key:generate --quiet
Write-Host "✅ APP_KEY generado" -ForegroundColor Green
Write-Host ""

# 5. Verificar base de datos
Write-Host "🗄️ Paso 4: Verificando base de datos..." -ForegroundColor Cyan
Write-Host "Por favor asegúrate de tener MySQL corriendo y la BD 'cialo_test' creada" -ForegroundColor Yellow
Write-Host "Ejecuta en MySQL: CREATE DATABASE cialo_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" -ForegroundColor Yellow
Write-Host ""

# 6. Ejecutar migraciones
Write-Host "🏗️ Paso 5: Ejecutando migraciones..." -ForegroundColor Cyan
php artisan migrate --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en migraciones. ¿La base de datos existe?" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Migraciones completadas" -ForegroundColor Green
Write-Host ""

# 7. Seed de datos
Write-Host "🌱 Paso 6: Creando datos de prueba..." -ForegroundColor Cyan
php artisan db:seed --class=TestDataSeeder --force
Write-Host "✅ Datos de prueba creados" -ForegroundColor Green
Write-Host ""

# 8. Vincular con Herd
Write-Host "🔗 Paso 7: Vinculando con Laravel Herd..." -ForegroundColor Cyan
herd link cialo-backend
Write-Host "✅ Proyecto vinculado a: http://cialo-backend.test" -ForegroundColor Green
Write-Host ""

# 9. Cache
Write-Host "⚡ Paso 8: Generando cache..." -ForegroundColor Cyan
php artisan config:cache
php artisan route:cache
php artisan view:cache
Write-Host "✅ Cache generada" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 ¡Configuración completa!" -ForegroundColor Green
Write-Host ""
Write-Host "📌 URLs de acceso:" -ForegroundColor Cyan
Write-Host "   • API: http://cialo-backend.test/api" -ForegroundColor White
Write-Host "   • Admin: http://cialo-backend.test/admin" -ForegroundColor White
Write-Host ""
Write-Host "📌 Credenciales de prueba:" -ForegroundColor Cyan
Write-Host "   • Admin: admin@cialo.cl / admin123" -ForegroundColor White
Write-Host "   • Pagos: pagos@cialo.cl / CialoPagos2025" -ForegroundColor White
Write-Host "   • Cliente: cliente@test.com / password123" -ForegroundColor White
Write-Host ""
Write-Host "📌 Comandos útiles:" -ForegroundColor Cyan
Write-Host "   • Ver logs: tail -f storage/logs/laravel.log" -ForegroundColor White
Write-Host "   • Reiniciar: php artisan serve" -ForegroundColor White
Write-Host "   • Desvincular Herd: herd unlink cialo-backend" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Abre http://cialo-backend.test/admin en tu navegador para empezar!" -ForegroundColor Green