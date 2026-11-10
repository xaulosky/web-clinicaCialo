-- Tabla de administradores
-- Ejecutar en phpMyAdmin o MySQL CLI

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    rol ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
    activo TINYINT(1) DEFAULT 1,
    ultimo_acceso DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear usuario admin inicial (contraseña: admin123)
-- El hash es generado con password_hash('admin123', PASSWORD_DEFAULT)
INSERT INTO admin_users (email, password, nombre, rol) VALUES (
    'admin@cialo.cl',
    '$2y$10$dyrHNNOiAafU6SFsVEb8NeT4fzlBker2BaNd4DpvliWYIWM16y9Se', -- admin123
    'Administrador',
    'super_admin'
);

-- Usuario de Pagos (Constraseña: CialoPagos2025)
INSERT INTO admin_users (email, password, nombre, rol) VALUES (
    'pagos@cialo.cl',
    '$2y$10$RVSY2kUkEWMYlC5ErM2VeuzzwRFO017pIlY2QnpQiYjZPK9zGFIPq',
    'Pagos',
    'admin'
);

-- Para generar un nuevo hash de contraseña, usa:
-- php -r "echo password_hash('tu_contraseña', PASSWORD_DEFAULT);"
