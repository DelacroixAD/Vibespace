CREATE DATABASE IF NOT EXISTS productivity_db;
USE productivity_db;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    details TEXT,
    is_important ENUM('true', 'false') DEFAULT 'false',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
