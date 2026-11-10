-- Migration 011: add attribution columns and report indexes to orders
-- Cada ALTER en su propia sentencia. El runner ejecuta sentencia por sentencia
-- y tolera errores de 'columna/clave duplicada' (no es idempotente).

-- Columna utm_source
ALTER TABLE orders ADD COLUMN utm_source VARCHAR(100) NULL;

-- Columna utm_medium
ALTER TABLE orders ADD COLUMN utm_medium VARCHAR(100) NULL;

-- Columna utm_campaign
ALTER TABLE orders ADD COLUMN utm_campaign VARCHAR(100) NULL;

-- Columna referrer
ALTER TABLE orders ADD COLUMN referrer VARCHAR(255) NULL;

-- Columna device
ALTER TABLE orders ADD COLUMN device VARCHAR(20) NULL;

-- Columna canal
ALTER TABLE orders ADD COLUMN canal VARCHAR(40) NULL;

-- Indice por canal
ALTER TABLE orders ADD INDEX idx_canal (canal);

-- Indice por status y created_at
ALTER TABLE orders ADD INDEX idx_status_created (status, created_at);

-- Indice por paid_at
ALTER TABLE orders ADD INDEX idx_paid_at (paid_at);
