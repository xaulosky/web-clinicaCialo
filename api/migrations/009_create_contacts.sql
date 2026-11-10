CREATE TABLE IF NOT EXISTS contacts (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NULL,
    subject VARCHAR(200) NULL,
    message TEXT NULL,
    estado ENUM('nuevo','respondido','cerrado') NOT NULL DEFAULT 'nuevo',
    utm_source VARCHAR(100) NULL,
    referrer VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    responded_at DATETIME NULL,
    admin_id INT NULL,
    PRIMARY KEY (id),
    INDEX idx_estado (estado),
    INDEX idx_created (created_at),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
