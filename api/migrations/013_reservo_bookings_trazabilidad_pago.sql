-- Migración 013: trazabilidad del pago en reservo_bookings
--
-- Motivación:
--  1) El estado 'ERROR' se usaba para dos cosas incompatibles: el abandono del
--     formulario de Webpay (SIN cargo) y el pago cobrado cuya cita no se pudo
--     crear (CON cargo). Se separa con un estado propio, PAGADO_SIN_CITA, para
--     que la clínica pueda encontrarlos sin inspeccionar authorization_code.
--  2) No se guardaba NADA de lo que devuelve Transbank salvo el código de
--     autorización: sin paid_at, sin monto confirmado y sin response_code no se
--     puede conciliar contra la cartola.
--  3) No había forma de saber cuántas veces se intentó crear la cita ni por qué
--     falló.
--
-- Es aditiva: ningún dato existente se pierde ni cambia de significado.
-- Ejecutar en MySQL contra la BD de producción ANTES de subir el código nuevo
-- (el código nuevo tolera que las columnas ya existan, pero no al revés).

ALTER TABLE `reservo_bookings`
    MODIFY COLUMN `status`
        ENUM('PENDIENTE','PAGADO','RECHAZADO','CANCELADO','ERROR','PAGADO_SIN_CITA','ABANDONADO')
        NOT NULL DEFAULT 'PENDIENTE'
        COMMENT 'PAGADO_SIN_CITA = se cobró pero la cita no se creó: requiere gestión manual';

ALTER TABLE `reservo_bookings`
    ADD COLUMN `amount_paid` INT NULL DEFAULT NULL
        COMMENT 'Monto que Transbank confirmó realmente haber capturado (CLP)',
    ADD COLUMN `paid_at` DATETIME NULL DEFAULT NULL
        COMMENT 'Momento de la captura del pago; distinto de created_at (inicio)',
    ADD COLUMN `response_code` INT NULL DEFAULT NULL
        COMMENT 'responseCode de Transbank; 0 = aprobado',
    ADD COLUMN `card_number` VARCHAR(10) NULL DEFAULT NULL
        COMMENT 'Últimos dígitos de la tarjeta, para conciliar',
    ADD COLUMN `payment_status` VARCHAR(30) NULL DEFAULT NULL
        COMMENT 'status textual de Transbank (AUTHORIZED, FAILED...)',
    ADD COLUMN `intentos_cita` TINYINT UNSIGNED NOT NULL DEFAULT 0
        COMMENT 'Cuántas veces se intentó crear la cita en reservo.cl',
    ADD COLUMN `last_error` VARCHAR(500) NULL DEFAULT NULL
        COMMENT 'Último error al crear la cita, para diagnóstico',
    ADD COLUMN `alertado_at` DATETIME NULL DEFAULT NULL
        COMMENT 'Cuándo se avisó a la clínica de un PAGADO_SIN_CITA (evita re-alertar)',
    ADD COLUMN `resuelto_at` DATETIME NULL DEFAULT NULL
        COMMENT 'Cuándo se marcó como gestionado manualmente desde el admin',
    ADD COLUMN `resuelto_nota` VARCHAR(500) NULL DEFAULT NULL
        COMMENT 'Qué se hizo: cita creada a mano, reembolso, etc.',
    ADD COLUMN `profesional` VARCHAR(20) NULL DEFAULT NULL
        COMMENT 'id del profesional en reservo; vivía solo dentro del JSON payload';

-- Reclasifica los casos históricos: 'ERROR' con código de autorización significa
-- que SÍ hubo cobro y la cita falló. Sin código de autorización no hubo cargo.
UPDATE `reservo_bookings`
   SET `status` = 'PAGADO_SIN_CITA'
 WHERE `status` = 'ERROR'
   AND `authorization_code` IS NOT NULL
   AND `authorization_code` <> '';

-- Rellena paid_at para las reservas ya cobradas, con la mejor aproximación
-- disponible (updated_at es cuando se marcaron PAGADO).
UPDATE `reservo_bookings`
   SET `paid_at` = `updated_at`
 WHERE `paid_at` IS NULL
   AND `status` IN ('PAGADO','PAGADO_SIN_CITA')
   AND `amount` > 0;

-- Rellena el profesional de las reservas históricas desde el JSON del payload,
-- para que el candado de horario funcione también con lo ya guardado.
UPDATE `reservo_bookings`
   SET `profesional` = JSON_UNQUOTE(JSON_EXTRACT(`payload`, '$.profesionales'))
 WHERE `profesional` IS NULL
   AND JSON_VALID(`payload`)
   AND JSON_EXTRACT(`payload`, '$.profesionales') IS NOT NULL;

-- Para encontrar rápido lo que necesita gestión manual, y para el candado que
-- impide vender dos veces la misma hora del mismo profesional.
ALTER TABLE `reservo_bookings`
    ADD INDEX `idx_status_created` (`status`, `created_at`),
    ADD INDEX `idx_paid_at` (`paid_at`),
    ADD INDEX `idx_cupo` (`profesional`, `fecha`, `hora_inicio`, `status`);
