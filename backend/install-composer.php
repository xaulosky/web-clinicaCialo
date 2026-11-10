<?php
/**
 * Script de instalación automática para Windows + Herd
 * Este script instala Composer si no existe y luego ejecuta composer install
 */

echo "🔧 Instalador de dependencias para Cialo Backend\n";
echo "================================================\n\n";

// 1. Verificar si Composer está instalado
$composer = trim(shell_exec('where composer 2>nul'));
if (empty($composer)) {
    echo "⚠️  Composer no encontrado. Descargando...\n";
    
    // Descargar Composer
    $composerSetup = __DIR__ . '/composer-setup.php';
    if (!file_exists($composerSetup)) {
        copy('https://getcomposer.org/installer', $composerSetup);
    }
    
    // Instalar Composer localmente
    echo "📦 Instalando Composer...\n";
    shell_exec('php ' . escapeshellarg($composerSetup) . ' --install-dir=' . escapeshellarg(__DIR__) . ' --filename=composer');
    
    if (file_exists(__DIR__ . '/composer')) {
        $composer = __DIR__ . '/composer';
        echo "✅ Composer instalado localmente\n";
    } else {
        echo "❌ Error instalando Composer\n";
        echo "Por favor descarga Composer manualmente de: https://getcomposer.org/download/\n";
        exit(1);
    }
} else {
    echo "✅ Composer encontrado: $composer\n";
}

echo "\n📦 Instalando dependencias de Laravel...\n";
echo "(Este proceso puede tardar varios minutos)\n\n";

// 2. Ejecutar composer install
$command = escapeshellarg($composer) . ' install --no-interaction --no-progress 2>&1';
passthru($command, $returnCode);

if ($returnCode !== 0) {
    echo "\n❌ Error instalando dependencias\n";
    exit(1);
}

echo "\n✅ Dependencias instaladas correctamente!\n\n";

// 3. Verificar que vendor/autoload.php existe
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    echo "✅ vendor/autoload.php encontrado\n";
} else {
    echo "❌ vendor/autoload.php no encontrado después de la instalación\n";
    exit(1);
}

// 4. Configurar .env si no existe
if (!file_exists(__DIR__ . '/.env')) {
    echo "\n⚙️  Creando archivo .env...\n";
    copy(__DIR__ . '/.env.example', __DIR__ . '/.env');
    echo "✅ Archivo .env creado\n";
}

// 5. Generar APP_KEY
echo "\n🔑 Generando APP_KEY...\n";
shell_exec('php artisan key:generate --quiet');
echo "✅ APP_KEY generado\n";

echo "\n🎉 ¡Instalación completada!\n";
echo "\nPróximos pasos:\n";
echo "1. Crea la base de datos 'cialo_test' en MySQL\n";
echo "2. Ejecuta: php artisan migrate\n";
echo "3. Ejecuta: php artisan db:seed --class=TestDataSeeder\n";
echo "4. Visita: http://cialo-backend.test\n";
