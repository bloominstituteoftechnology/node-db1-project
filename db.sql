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
    CustomerName LIKE '%Alfreds%';--
    -- find all customers that live in London.
SELECT
    *
FROM
    Customers
WHERE
    Country = 'Germany';-- -
    -- find the phone number for a particular supplier (provide id, or supplier name).
SELECT
    SupplierName,
    Phone
FROM
    Suppliers
WHERE
    SupplierName = 'Exotic Liquid';--
    -- find all customers in a particular postal code.
SELECT
    *
FROM
    Customers
WHERE
    PostalCode = '12209';--
    -- find all suppliers who have names with more than 20 characters.
SELECT
    *
FROM
    suppliers
WHERE
    Length(suppliername) > 20;--
    -- list customers descending by the number of orders.
SELECT
    c.customername,
    Count(orderid) AS orders
FROM
    customers c
    JOIN orders o ON c.customerid = o.customerid
GROUP BY
    c.customername
ORDER BY
    orders DESC;