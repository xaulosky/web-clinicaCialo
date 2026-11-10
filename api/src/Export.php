<?php

namespace App;

class Export
{
    public static function csv(array $rows, string $filename): void
    {
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="' . $filename . '"');

        // BOM UTF-8 para que Excel respete los acentos
        echo "\xEF\xBB\xBF";

        $out = fopen('php://output', 'w');

        if (!empty($rows)) {
            // Encabezado: claves de la primera fila
            fputcsv($out, array_keys($rows[0]));

            // Filas de datos
            foreach ($rows as $row) {
                fputcsv($out, array_values($row));
            }
        }

        fclose($out);
        exit;
    }
}
