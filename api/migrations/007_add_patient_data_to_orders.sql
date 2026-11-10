-- =============================================
-- Migración 007: Datos del paciente (quien se atiende) y notas en órdenes
-- =============================================
-- NOTA: El modelo Order.php agrega estas columnas automáticamente
-- (ver Order::ensureExtraColumns) la primera vez que se crea una orden
-- tras el deploy. Esta migración queda como respaldo / documentación.
--
-- Si tu versión de MySQL/MariaDB soporta "IF NOT EXISTS" en ADD COLUMN,
-- puedes ejecutar este archivo de forma segura más de una vez.

ALTER TABLE orders
    ADD COLUMN notas TEXT NULL,
    ADD COLUMN paciente_nombre VARCHAR(100) NULL,
    ADD COLUMN paciente_apellido VARCHAR(100) NULL,
    ADD COLUMN paciente_rut VARCHAR(15) NULL,
    ADD COLUMN paciente_telefono VARCHAR(20) NULL;
