<?php
/**
 * Script de diagnóstico para verificar instalación Laravel
 * Ejecutar: php backend/check-installation.php
 */

$errors = [];
$warnings = [];
$ok = [];

// 1. Verificar PHP version
if (version_compare(PHP_VERSION, '8.2.0', '>=')) {
    $ok[] = "✅ PHP " . PHP_VERSION . " (OK)";
} else {
    $errors[] = "❌ PHP " . PHP_VERSION . " - Se requiere PHP 8.2+";
}

// 2. Verificar extensiones necesarias
$required_extensions = ['mbstring', 'openssl', 'pdo', 'pdo_mysql', 'tokenizer', 'xml', 'ctype', 'json', 'bcmath'];
foreach ($required_extensions as $ext) {
    if (extension_loaded($ext)) {
        $ok[] = "✅ Extensión $ext cargada";
    } else {
        $errors[] = "❌ Extensión $ext NO cargada (requerida)";
    }
}

// 3. Verificar composer
$composer_path = trim(shell_exec('where composer 2>nul') ?: shell_exec('which composer 2>/dev/null'));
if ($composer_path) {
    $ok[] = "✅ Composer encontrado: $composer_path";
} else {
    $errors[] = "❌ Composer NO encontrado. Instalar desde: https://getcomposer.org/download/";
}

// 4. Verificar estructura de directorios
$required_dirs = [
    'app',
    'bootstrap',
    'config',
    'database',
    'public',
    'routes',
    'storage',
    'storage/app',
    'storage/framework',
    'storage/logs',
];

foreach ($required_dirs as $dir) {
    if (is_dir(__DIR__ . '/' . $dir)) {
        $ok[] = "✅ Directorio $dir/ existe";
    } else {
        $errors[] = "❌ Directorio $dir/ NO existe";
    }
}

// 5. Verificar archivos críticos
$required_files = [
    'composer.json',
    'artisan',
    'public/index.php',
    'bootstrap/app.php',
    'routes/api.php',
];

foreach ($required_files as $file) {
    if (file_exists(__DIR__ . '/' . $file)) {
        $ok[] = "✅ Archivo $file existe";
    } else {
        $errors[] = "❌ Archivo $file NO existe";
    }
}

// 6. Verificar vendor/
if (is_dir(__DIR__ . '/vendor') && file_exists(__DIR__ . '/vendor/autoload.php')) {
    $ok[] = "✅ Vendor/ instalado (composer install ejecutado)";
} else {
    $errors[] = "❌ Vendor/ NO encontrado. Ejecutar: composer install";
}

// 7. Verificar .env
if (file_exists(__DIR__ . '/.env')) {
    $ok[] = "✅ Archivo .env existe";
    
    // Verificar APP_KEY
    $env_content = file_get_contents(__DIR__ . '/.env');
    if (preg_match('/APP_KEY=base64:([A-Za-z0-9+=\/]+)/', $env_content, $matches) || 
        preg_match('/APP_KEY=(?!\s*$)(.+)/', $env_content, $matches)) {
        $ok[] = "✅ APP_KEY configurado";
    } else {
        $warnings[] = "⚠️ APP_KEY no configurado. Ejecutar: php artisan key:generate";
    }
} else {
    $errors[] = "❌ Archivo .env NO existe. Copiar: cp .env.example .env";
}

// Mostrar resultados
echo "\n";
echo "========================================\n";
echo "🔍 DIAGNÓSTICO DE INSTALACIÓN LARAVEL\n";
echo "========================================\n\n";

if (!empty($errors)) {
    echo "❌ ERRORES (deben corregirse):\n";
    echo "------------------------------\n";
    foreach ($errors as $error) {
        echo $error . "\n";
    }
    echo "\n";
}

if (!empty($warnings)) {
    echo "⚠️  ADVERTENCIAS (recomendado corregir):\n";
    echo "-----------------------------------------\n";
    foreach ($warnings as $warning) {
        echo $warning . "\n";
    }
    echo "\n";
}

if (!empty($ok)) {
    echo "✅ TODO CORRECTO:\n";
    echo "-----------------\n";
    foreach ($ok as $item) {
        echo $item . "\n";
    }
    echo "\n";
}

// Resumen
echo "========================================\n";
if (empty($errors)) {
    echo "🎉 ¡Instalación correcta! Puedes continuar.\n";
    echo "\nPróximos pasos:\n";
    echo "1. php artisan migrate\n";
    echo "2. php artisan db:seed --class=TestDataSeeder\n";
    echo "3. php artisan serve\n";
} else {
    echo "❌ Hay " . count($errors) . " error(es) que debes corregir primero.\n";
    echo "\nSolución rápida:\n";
    if (!is_dir(__DIR__ . '/vendor')) {
        echo "→ composer install\n";
    }
    if (!file_exists(__DIR__ . '/.env')) {
        echo "→ copy .env.example .env\n";
    }
}
echo "========================================\n";
