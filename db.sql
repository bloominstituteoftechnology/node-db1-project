CREATE TABLE `accounts` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` TEXT NOT NULL UNIQUE,
    `budget` REAL
);CREATE INDEX idx_accounts_name ON accounts (name);