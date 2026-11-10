-- Migración: Crear tabla de cupones
-- Ejecutar en MySQL

CREATE TABLE IF NOT EXISTS `coupons` (
    `id` VARCHAR(36) PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `tipo` ENUM('porcentaje', 'monto') DEFAULT 'porcentaje',
    `valor` DECIMAL(10,2) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `monto_minimo` DECIMAL(10,2) NULL COMMENT 'Compra mínima requerida',
    `descuento_maximo` DECIMAL(10,2) NULL COMMENT 'Máximo descuento para tipo porcentaje',
    `usos_maximos` INT NULL COMMENT 'NULL = ilimitado',
    `usos_actuales` INT DEFAULT 0,
    `fecha_inicio` DATETIME NULL,
    `fecha_fin` DATETIME NULL,
    `activo` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_code` (`code`),
    INDEX `idx_activo` (`activo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cupones de ejemplo
INSERT INTO `coupons` (`id`, `code`, `tipo`, `valor`, `descripcion`, `monto_minimo`, `usos_maximos`, `fecha_fin`) VALUES
(UUID(), 'BIENVENIDO10', 'porcentaje', 10, '10% de descuento en tu primera compra', 20000, NULL, NULL),
(UUID(), 'VERANO2026', 'porcentaje', 15, '15% de descuento de verano', 50000, 100, '2026-03-31 23:59:59'),
(UUID(), 'CIALO5000', 'monto', 5000, '$5.000 de descuento', 30000, 50, NULL);
