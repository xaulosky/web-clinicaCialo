-- Migración: Tabla de reservas de citas con abono (Webpay → reservo.cl)
-- Ejecutar en MySQL

CREATE TABLE IF NOT EXISTS `reservo_bookings` (
    `id` VARCHAR(36) PRIMARY KEY,
    `buy_order` VARCHAR(40) NOT NULL UNIQUE COMMENT 'Orden de compra Webpay',
    `token` VARCHAR(100) NULL COMMENT 'token_ws de Transbank',
    `status` ENUM('PENDIENTE','PAGADO','RECHAZADO','CANCELADO','ERROR') DEFAULT 'PENDIENTE',
    `amount` INT NOT NULL COMMENT 'Monto del abono en CLP',

    -- Datos de la cita a crear en reservo (al confirmar el pago)
    `fecha` DATE NOT NULL,
    `hora_inicio` VARCHAR(5) NOT NULL,
    `hora_fin` VARCHAR(5) NOT NULL,
    `servicio` VARCHAR(20) NOT NULL COMMENT 'id de agenda en reservo',
    `tratamiento` VARCHAR(20) NULL COMMENT 'id de servicio/tratamiento en reservo',
    `tratamiento_nombre` VARCHAR(255) NULL,

    -- Datos del cliente
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_email` VARCHAR(150) NULL,
    `customer_phone` VARCHAR(40) NULL,
    `customer_rut` VARCHAR(20) NULL,

    -- Payload completo enviado a reservo y resultado
    `payload` TEXT NOT NULL COMMENT 'JSON con el body de createAppt',
    `cita_id` VARCHAR(30) NULL COMMENT 'id de la cita creada en reservo',
    `authorization_code` VARCHAR(20) NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX `idx_token` (`token`),
    INDEX `idx_buy_order` (`buy_order`),
    INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
