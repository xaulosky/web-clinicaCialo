-- Migración: Sistema de Afiliados y Comisiones
-- Ejecutar en MySQL/MariaDB

-- 1. Agregar campos de afiliado a la tabla de cupones
ALTER TABLE `coupons` ADD COLUMN `categoria` ENUM('descuento', 'personal', 'afiliado') DEFAULT 'descuento' AFTER `code`;
ALTER TABLE `coupons` ADD COLUMN `afiliado_id` VARCHAR(36) NULL AFTER `categoria`;
ALTER TABLE `coupons` ADD COLUMN `comision_porcentaje` DECIMAL(5,2) NULL AFTER `afiliado_id`;
ALTER TABLE `coupons` ADD INDEX `idx_categoria` (`categoria`);
ALTER TABLE `coupons` ADD INDEX `idx_afiliado` (`afiliado_id`);

-- 2. Crear tabla de afiliados
CREATE TABLE IF NOT EXISTS `affiliates` (
    `id` VARCHAR(36) PRIMARY KEY,
    `user_id` VARCHAR(36) NOT NULL COMMENT 'Referencia al usuario',
    `codigo_afiliado` VARCHAR(20) NOT NULL UNIQUE COMMENT 'Código único del afiliado',
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(20) NULL,
    `rut` VARCHAR(20) NULL COMMENT 'Para facturación de comisiones',
    `banco` VARCHAR(50) NULL,
    `tipo_cuenta` ENUM('corriente', 'vista', 'ahorro') NULL,
    `numero_cuenta` VARCHAR(50) NULL,
    `comision_default` DECIMAL(5,2) DEFAULT 10.00 COMMENT 'Comisión por defecto (%)',
    `total_ventas` DECIMAL(12,2) DEFAULT 0 COMMENT 'Total de ventas generadas',
    `total_comisiones` DECIMAL(12,2) DEFAULT 0 COMMENT 'Total de comisiones acumuladas',
    `comisiones_pagadas` DECIMAL(12,2) DEFAULT 0 COMMENT 'Comisiones ya pagadas',
    `activo` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_user` (`user_id`),
    INDEX `idx_codigo` (`codigo_afiliado`),
    INDEX `idx_activo` (`activo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Crear tabla de comisiones (registro de cada comisión generada)
CREATE TABLE IF NOT EXISTS `commissions` (
    `id` VARCHAR(36) PRIMARY KEY,
    `affiliate_id` VARCHAR(36) NOT NULL,
    `order_id` VARCHAR(36) NOT NULL,
    `coupon_id` VARCHAR(36) NOT NULL,
    `monto_venta` DECIMAL(12,2) NOT NULL COMMENT 'Monto de la venta',
    `porcentaje_comision` DECIMAL(5,2) NOT NULL,
    `monto_comision` DECIMAL(12,2) NOT NULL COMMENT 'Comisión calculada',
    `estado` ENUM('pendiente', 'aprobada', 'pagada', 'cancelada') DEFAULT 'pendiente',
    `fecha_pago` DATETIME NULL,
    `notas` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_affiliate` (`affiliate_id`),
    INDEX `idx_order` (`order_id`),
    INDEX `idx_estado` (`estado`),
    INDEX `idx_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Agregar campo de cupón usado en órdenes
ALTER TABLE `orders` ADD COLUMN `coupon_id` VARCHAR(36) NULL AFTER `total`;
ALTER TABLE `orders` ADD COLUMN `coupon_code` VARCHAR(50) NULL AFTER `coupon_id`;
ALTER TABLE `orders` ADD COLUMN `descuento` DECIMAL(10,2) DEFAULT 0 AFTER `coupon_code`;
ALTER TABLE `orders` ADD INDEX `idx_coupon` (`coupon_id`);

-- 5. Cupones de ejemplo para personal y afiliados
-- Cupón de personal (sin comisión, solo descuento para empleados)
INSERT INTO `coupons` (`id`, `code`, `categoria`, `tipo`, `valor`, `descripcion`, `activo`) VALUES
(UUID(), 'STAFF20', 'personal', 'porcentaje', 20, '20% descuento para personal', 1),
(UUID(), 'STAFF30', 'personal', 'porcentaje', 30, '30% descuento para personal', 1);

