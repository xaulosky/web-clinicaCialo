<?php
ignore_user_abort(true);
set_time_limit(600);
ini_set('memory_limit', '1024M');

$file = __DIR__ . '/build-cialo.zip';
$next_dir = __DIR__ . '/_next';
$backup_dir = __DIR__ . '/_next_backup_' . time();
$extract_dir = __DIR__ . '/_next_extract_' . time();
$backup_success = false;
$success = false;

function removeDir($dir) {
    if (!is_dir($dir)) return true;

    if (function_exists('exec')) {
        @exec("rm -rf " . escapeshellarg($dir) . " 2>/dev/null");
    }

    if (is_dir($dir)) {
        $files = array_diff(scandir($dir), array('.', '..'));
        foreach ($files as $f) {
            $current = "$dir/$f";
            is_dir($current) ? removeDir($current) : @unlink($current);
        }
        return @rmdir($dir);
    }

    return true;
}

function ensureDir($dir) {
    if (file_exists($dir) && !is_dir($dir)) {
        @unlink($dir);
    }

    return is_dir($dir) || mkdir($dir, 0755, true);
}

function mergeDir($src, $dest) {
    if (!ensureDir($dest)) {
        echo "WARNING: No se pudo crear $dest\n";
        return 0;
    }

    $moved = 0;
    $items = array_diff(scandir($src), array('.', '..'));

    foreach ($items as $item) {
        $from = $src . '/' . $item;
        $to = $dest . '/' . $item;

        if (is_dir($from)) {
            $moved += mergeDir($from, $to);
            continue;
        }

        if (file_exists($to)) {
            @unlink($to);
        }

        if (@rename($from, $to)) {
            $moved++;
        } else if (@copy($from, $to)) {
            @unlink($from);
            $moved++;
        } else {
            echo "WARNING: No se pudo mover $to\n";
        }
    }

    return $moved;
}

function extractZip($file, $extract_dir) {
    if (function_exists('exec')) {
        exec("unzip -qo " . escapeshellarg($file) . " -d " . escapeshellarg($extract_dir), $output, $return_var);
        if ($return_var === 0) {
            echo "SUCCESS: Archivos extraidos correctamente.\n";
            return true;
        }
        echo "INFO: unzip del sistema fallo (codigo: $return_var).\n";
    }

    echo "INFO: Intentando con PHP ZipArchive...\n";
    $zip = new ZipArchive;
    $res = $zip->open($file);

    if ($res === TRUE) {
        $ok = $zip->extractTo($extract_dir);
        $zip->close();

        if ($ok) {
            echo "SUCCESS: Archivos extraidos con ZipArchive.\n";
            return true;
        }

        echo "ERROR: ZipArchive extractTo fallo.\n";
        return false;
    }

    echo "ERROR: Fallo al abrir el zip. Codigo: $res\n";
    return false;
}

if (!file_exists($file)) {
    http_response_code(404);
    die("ERROR: Zip file not found at $file\n");
}

$size = filesize($file);
echo "INFO: Archivo zip encontrado ($size bytes).\n";

if ($size < 100) {
    die("ERROR: El archivo zip no se subio correctamente (pesa $size bytes).\n");
}

echo "INFO: Extrayendo a directorio temporal...\n";
if (!ensureDir($extract_dir)) {
    http_response_code(500);
    die("ERROR: No se pudo crear directorio temporal.\n");
}

if (!extractZip($file, $extract_dir) || !is_dir($extract_dir . '/_next')) {
    removeDir($extract_dir);
    http_response_code(500);
    die("ERROR: Extraccion fallida o _next no encontrado en zip.\n");
}

echo "INFO: Respaldando _next actual...\n";
if (is_dir($next_dir)) {
    if (@rename($next_dir, $backup_dir)) {
        echo "INFO: Backup creado: " . basename($backup_dir) . "\n";
        $backup_success = true;
    } else {
        echo "WARNING: No se pudo renombrar _next; se eliminara directamente.\n";
        if (!removeDir($next_dir)) {
            removeDir($extract_dir);
            http_response_code(500);
            die("ERROR: No se pudo eliminar _next actual.\n");
        }
    }
}

echo "INFO: Publicando _next completo...\n";
if (!@rename($extract_dir . '/_next', $next_dir)) {
    if ($backup_success && is_dir($backup_dir)) {
        @rename($backup_dir, $next_dir);
        echo "INFO: Backup restaurado.\n";
    }
    removeDir($extract_dir);
    http_response_code(500);
    die("ERROR: No se pudo publicar _next.\n");
}

echo "INFO: Mezclando archivos de paginas y metadata...\n";
$moved_count = mergeDir($extract_dir, __DIR__);

echo "INFO: $moved_count archivos movidos o actualizados.\n";
echo "SUCCESS: Deploy completado correctamente.\n";
$success = true;

if ($backup_success && is_dir($backup_dir)) {
    removeDir($backup_dir);
    echo "INFO: Backup anterior eliminado.\n";
}

if (is_dir($extract_dir)) {
    removeDir($extract_dir);
}

$all_files = scandir(__DIR__);
foreach ($all_files as $f) {
    if ((strpos($f, '_next_backup_') === 0 || strpos($f, '_next_extract_') === 0) && is_dir(__DIR__ . '/' . $f)) {
        removeDir(__DIR__ . '/' . $f);
    }
}

if (file_exists($file)) unlink($file);
if (file_exists(__FILE__)) unlink(__FILE__);

if (!$success) {
    http_response_code(500);
    echo "ERROR: Deploy fallido.\n";
}
?>
