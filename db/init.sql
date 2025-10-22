-- Crear la base de datos si no existe, especificando la codificación
CREATE DATABASE IF NOT EXISTS mi_app_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mi_app_db;

-- Tabla de Usuarios (Entidad Principal)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_nacimiento DATE,
    es_activo BOOLEAN DEFAULT TRUE,
    salario DECIMAL(10, 2),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Productos (Depende de Usuarios)
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(8, 2) NOT NULL,
    stock INT,
    es_disponible BOOLEAN DEFAULT TRUE,
    fecha_lanzamiento DATE,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insertar 15 registros de ejemplo
INSERT INTO usuarios (nombre_completo, email, fecha_nacimiento, es_activo, salario) VALUES
('Ana García', 'ana.garcia@email.com', '1990-05-15', TRUE, 55000.00),
('Carlos Martínez', 'carlos.m@email.com', '1985-11-20', TRUE, 72000.50),
('Laura Rodríguez', 'laura.r@email.com', '1992-01-30', FALSE, 48000.75);

INSERT INTO productos (nombre_producto, descripcion, precio, stock, es_disponible, fecha_lanzamiento, usuario_id) VALUES
('Laptop Pro', 'Laptop de alto rendimiento', 1200.00, 50, TRUE, '2023-01-10', 1),
('Mouse Inalámbrico', 'Mouse ergonómico', 25.50, 200, TRUE, '2022-11-05', 1),
('Teclado Mecánico', 'Teclado para gaming', 89.99, 100, TRUE, '2023-03-20', 2),
('Monitor 4K', 'Monitor de 27 pulgadas', 350.00, 75, FALSE, '2023-02-15', 2),
('Webcam HD', 'Cámara web 1080p', 45.00, 150, TRUE, '2022-10-01', 3),
('Micrófono de Condensador', 'Micrófono para streaming', 110.00, 80, TRUE, '2023-04-12', 1),
('Silla Ergonómica', 'Silla de oficina ajustable', 250.75, 40, TRUE, '2023-05-01', 2),
('Disco Duro SSD 1TB', 'Almacenamiento de estado sólido', 99.99, 300, TRUE, '2023-01-25', 3),
('Auriculares con Cancelación de Ruido', 'Sonido inmersivo', 199.50, 120, TRUE, '2023-06-05', 1),
('Impresora Multifunción', 'Imprime, escanea y copia', 150.00, 60, TRUE, '2022-12-15', 2),
('Router WiFi 6', 'Conexión de alta velocidad', 130.25, 90, TRUE, '2023-07-20', 3),
('Tableta Gráfica', 'Para diseño digital', 85.00, 110, FALSE, '2023-08-01', 1),
('Proyector Portátil', 'Proyector para presentaciones', 300.00, 30, TRUE, '2023-09-10', 2),
('Batería Externa', 'Power bank de 20000mAh', 40.50, 500, TRUE, '2023-05-18', 3),
('Hub USB-C', 'Adaptador con múltiples puertos', 35.00, 250, TRUE, '2023-02-28', 1);