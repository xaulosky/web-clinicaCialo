@echo off
echo ================================================
echo  INSTALADOR AUTOMATICO - Cialo Backend
echo ================================================
echo.
echo Este script instalara Composer (si es necesario)
echo y todas las dependencias de Laravel.
echo.

cd /d "%~dp0"

REM Verificar PHP
php -v > nul 2>&1
if errorlevel 1 (
    echo [ERROR] PHP no encontrado. Asegurate de tener PHP en el PATH.
    echo Instala Laravel Herd primero: https://herd.laravel.com/
    pause
    exit /b 1
)

echo [OK] PHP encontrado

REM Verificar Composer
where composer > nul 2>&1
if errorlevel 1 (
    echo.
    echo [!] Composer no encontrado. Descargando...
    echo.
    
    REM Descargar Composer
    powershell -Command "Invoke-WebRequest -Uri 'https://getcomposer.org/installer' -OutFile 'composer-setup.php'"
    
    if not exist "composer-setup.php" (
        echo [ERROR] No se pudo descargar Composer.
        echo Descargalo manualmente de: https://getcomposer.org/download/
        pause
        exit /b 1
    )
    
    php composer-setup.php --quiet
    del composer-setup.php
    
    if exist "composer.phar" (
        echo [OK] Composer descargado
        set COMPOSER_CMD=php composer.phar
    ) else (
        echo [ERROR] No se pudo instalar Composer
        pause
        exit /b 1
    )
) else (
    echo [OK] Composer encontrado
    set COMPOSER_CMD=composer
)

echo.
echo ================================================
echo  Instalando dependencias...
echo  (Este proceso puede tardar 5-10 minutos)
echo ================================================
echo.

%COMPOSER_CMD% install --no-interaction --no-progress

if errorlevel 1 (
    echo.
    echo [ERROR] Fallo la instalacion de dependencias
    pause
    exit /b 1
)

echo.
echo [OK] Dependencias instaladas!

REM Configurar .env
if not exist ".env" (
    echo.
    echo [+] Creando archivo .env...
    copy .env.example .env > nul
    echo [OK] .env creado
)

REM Generar APP_KEY
echo.
echo [+] Generando APP_KEY...
php artisan key:generate --quiet
echo [OK] APP_KEY generado

echo.
echo ================================================
echo  INSTALACION COMPLETADA!
echo ================================================
echo.
echo Próximos pasos:
echo 1. Abre tu cliente MySQL (phpMyAdmin, TablePlus, etc.)
echo 2. Crea la base de datos: cialo_test
echo 3. Ejecuta: php artisan migrate
echo 4. Ejecuta: php artisan db:seed --class=TestDataSeeder
echo 5. Visita: http://cialo-backend.test
echo.
echo Credenciales de prueba:
echo   Admin: admin@cialo.cl / admin123
echo.
pause
