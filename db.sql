CREATE TABLE `accounts` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` TEXT NOT NULL UNIQUE,
    `budget` REAL
);CREATE INDEX idx_accounts_name ON accounts (name);--
-- find all customers with a particular first name.
SELECT
    *
FROM
    Customers
WHERE
    CustomerName LIKE '%Alfreds%' --
    -- find all customers that live in London.
SELECT
    *
FROM
    Customers
WHERE
    Country = 'Germany' -- -
    -- find the phone number for a particular supplier (provide id, or supplier name).