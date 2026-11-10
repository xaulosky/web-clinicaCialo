<?php
/**
 * Script de deploy para Laravel en cPanel (solo FTP, sin SSH)
 * Se auto-elimina después de ejecutar
 */

ignore_user_abort(true);
set_time_limit(300);
ini_set('memory_limit', '512M');

$basePath = __DIR__;
$backendPath = $basePath . '/backend';
$zipFile = $basePath . '/backend-deploy.zip';
$logFile = $basePath . '/deploy-backend.log';

function logMsg($msg) {
    global $logFile;
    $line = date('[Y-m-d H:i:s] ') . $msg . "\n";
    file_put_contents($logFile, $line, FILE_APPEND);
    echo $line;
    flush();
}

function removeDir($dir) {
    if (!is_dir($dir)) return true;
    if (function_exists('exec')) {
        @exec("rm -rf " . escapeshellarg($dir) . " 2>/dev/null");
    }
    if (is_dir($dir)) {
        $files = array_diff(scandir($dir), ['.', '..']);
        foreach ($files as $f) {
            $current = "$dir/$f";
            is_dir($current) ? removeDir($current) : @unlink($current);
        }
        return @rmdir($dir);
    }
    return true;
}

try {
    logMsg("🚀 Iniciando deploy del backend Laravel");
    
    // 1. Verificar ZIP
    if (!file_exists($zipFile)) {
        throw new Exception("ZIP no encontrado: $zipFile");
    }
    
    $zipSize = filesize($zipFile);
    logMsg("📦 ZIP encontrado ($zipSize bytes)");
    
    if ($zipSize < 1000) {
        throw new Exception("ZIP demasiado pequeño, posible error de subida");
    }
    
    // 2. Backup del backend actual
    $backupPath = $basePath . '/backend_backup_' . time();
    if (is_dir($backendPath)) {
        logMsg("💾 Creando backup del backend actual...");
        if (@rename($backendPath, $backupPath)) {
            logMsg("✅ Backup creado");
        } else {
            logMsg("⚠️ No se pudo crear backup, eliminando directorio actual");
            if (!removeDir($backendPath)) {
                throw new Exception("No se pudo eliminar backend actual");
            }
        }
    }
    
    // 3. Crear directorio temporal
    $tempPath = $basePath . '/backend_temp_' . time();
    if (!mkdir($tempPath, 0755, true)) {
        throw new Exception("No se pudo crear directorio temporal");
    }
    
    // 4. Extraer ZIP
    logMsg("📂 Extrayendo archivos...");
    $success = false;
    
    // Intentar con unzip del sistema primero
    if (function_exists('exec')) {
        exec("unzip -qo " . escapeshellarg($zipFile) . " -d " . escapeshellarg($tempPath), $output, $returnCode);
        if ($returnCode === 0 && is_dir($tempPath . '/app')) {
            $success = true;
            logMsg("✅ Extraído con unzip");
        }
    }
    
    // Fallback a ZipArchive
    if (!$success) {
        $zip = new ZipArchive();
        if ($zip->open($zipFile) === TRUE) {
            if ($zip->extractTo($tempPath)) {
                $success = true;
                logMsg("✅ Extraído con ZipArchive");
            } else {
                throw new Exception("ZipArchive extractTo falló");
            }
            $zip->close();
        } else {
            throw new Exception("No se pudo abrir el ZIP");
        }
    }
    
    if (!$success) {
        throw new Exception("Extracción fallida");
    }
    
    // 5. Mover a directorio final
    logMsg("📁 Moviendo archivos a backend/...");
    if (!@rename($tempPath, $backendPath)) {
        // Si rename falla, copiar manualmente
        if (!mkdir($backendPath, 0755, true)) {
            throw new Exception("No se pudo crear directorio backend");
        }
        
        $files = scandir($tempPath);
        foreach ($files as $f) {
            if ($f === '.' || $f === '..') continue;
            $src = $tempPath . '/' . $f;
            $dest = $backendPath . '/' . $f;
            
            if (is_dir($src)) {
                // Copiar directorio recursivamente
                function copyDir($src, $dst) {
                    $dir = opendir($src);
                    @mkdir($dst);
                    while (($file = readdir($dir)) !== false) {
                        if ($file != '.' && $file != '..') {
                            if (is_dir($src . '/' . $file)) {
                                copyDir($src . '/' . $file, $dst . '/' . $file);
                            } else {
                                copy($src . '/' . $file, $dst . '/' . $file);
                            }
                        }
                    }
                    closedir($dir);
                }
                copyDir($src, $dest);
            } else {
                copy($src, $dest);
            }
        }
        removeDir($tempPath);
    }
    
    logMsg("✅ Archivos movidos");
    
    // 6. Setear permisos
    logMsg("🔧 Configurando permisos...");
    @chmod($backendPath . '/storage', 0755);
    @chmod($backendPath . '/bootstrap/cache', 0755);
    @chmod($backendPath . '/storage/logs', 0755);
    @chmod($backendPath . '/storage/framework', 0755);
    @chmod($backendPath . '/storage/app', 0755);
    
    // 7. Crear symlink storage si no existe
    $publicStorage = $backendPath . '/public/storage';
    $appPublic = $backendPath . '/storage/app/public';
    if (!file_exists($publicStorage) && is_dir($appPublic)) {
        if (function_exists('symlink')) {
            @symlink($appPublic, $publicStorage);
            logMsg("🔗 Symlink storage creado");
        }
    }
    
    // 8. Ejecutar migraciones (si exec está disponible)
    logMsg("🗄️ Ejecutando migraciones...");
    if (function_exists('exec')) {
        $artisan = $backendPath . '/artisan';
        if (file_exists($artisan)) {
            exec("cd $backendPath && php artisan migrate --force 2>&1", $migrateOutput, $migrateCode);
            logMsg("Migraciones: " . implode("\n", $migrateOutput));
            
            if ($migrateCode === 0) {
                logMsg("✅ Migraciones completadas");
            } else {
                logMsg("⚠️ Migraciones con warnings (código: $migrateCode)");
            }
            
            // Clear y cache de config
            exec("cd $backendPath && php artisan config:cache 2>&1", $configOutput);
            exec("cd $backendPath && php artisan route:cache 2>&1", $routeOutput);
            exec("cd $backendPath && php artisan view:cache 2>&1", $viewOutput);
            logMsg("✅ Cache generada");
        }
    } else {
        logMsg("⚠️ exec() no disponible. Ejecuta manualmente:");
        logMsg("cd $backendPath && php artisan migrate --force");
    }
    
    // 9. Limpiar backups antiguos (mantener solo últimos 3)
    $backups = glob($basePath . '/backend_backup_*');
    if (count($backups) > 3) {
        usort($backups, function($a, $b) {
            return filemtime($a) - filemtime($b);
        });
        $toDelete = array_slice($backups, 0, count($backups) - 3);
        foreach ($toDelete as $oldBackup) {
            removeDir($oldBackup);
        }
        logMsg("🧹 Backups antiguos eliminados");
    }
    
    // 10. Limpiar archivos temporales
    if (file_exists($zipFile)) {
        unlink($zipFile);
    }
    
    // 11. Verificar salud
    logMsg("🏥 Verificando instalación...");
    $healthFile = $backendPath . '/public/index.php';
    if (file_exists($healthFile)) {
        logMsg("✅ Laravel instalado correctamente");
    } else {
        throw new Exception("Instalación incompleta: falta public/index.php");
    }
    
    logMsg("🎉 Deploy completado exitosamente!");
    logMsg("📌 Acceso: https://api.cialo.cl");
    logMsg("📌 Admin: https://api.cialo.cl/admin");
    
} catch (Exception $e) {
    logMsg("❌ ERROR: " . $e->getMessage());
    http_response_code(500);
    
    // Intentar restaurar backup si existe
    if (isset($backupPath) && is_dir($backupPath) && !is_dir($backendPath)) {
        @rename($backupPath, $backendPath);
        logMsg("🔄 Backup restaurado");
    }
} finally {
    // Limpiar directorio temporal si quedó
    if (isset($tempPath) && is_dir($tempPath)) {
        removeDir($tempPath);
    }
    
    // Auto-eliminar script
    if (file_exists(__FILE__)) {
        unlink(__FILE__);
    }
}
