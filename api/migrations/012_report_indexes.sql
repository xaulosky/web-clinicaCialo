-- Migration 012: report indexes for reservo_bookings, commissions and order_items
-- Cada ALTER en su propia sentencia. El runner ejecuta sentencia por sentencia
-- y tolera errores de 'clave duplicada' (no es idempotente).

-- Indice por status y created_at en reservo_bookings
ALTER TABLE reservo_bookings ADD INDEX idx_status_created (status, created_at);

-- Indice por affiliate_id y estado en commissions
ALTER TABLE commissions ADD INDEX idx_affiliate_estado (affiliate_id, estado);

-- Indice por name en order_items
ALTER TABLE order_items ADD INDEX idx_name (name);
