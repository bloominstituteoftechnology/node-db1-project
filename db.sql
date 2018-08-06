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
    orders DESC;--
    -- list orders descending by the order date.
SELECT
    *
FROM
    orders
ORDER BY
    orderdate DESC;--
    -- list orders grouped by customer showing the number of orders per customer.
SELECT
    c.customername,
    Count(orderid) AS orders
FROM
    customers c
    JOIN orders o ON c.customerid = o.customerid
GROUP BY
    c.customername
ORDER BY
    orders DESC;--
    -- list orders grouped by customer's city showing number of orders per city.
SELECT
    c.city,
    Count(orderid) AS orders
FROM
    customers c
    JOIN orders o ON c.customerid = o.customerid
GROUP BY
    c.city
ORDER BY
    orders DESC;--
    -- add a customer using your information.
INSERT INTO
    Customers (
        CustomerName,
        ContactName,
        Address,
        City,
        PostalCode,
        Country
    )
VALUES
    (
        'DC IT LLC',
        'Daniel Chamorro',
        '123 Drive',
        'Charlotte',
        '28269',
        'USA'
    );--
    -- add 2 products.
INSERT INTO
    Products (ProductName, SupplierID, CategoryID, Unit, Price)
VALUES
    ('Test', 1, 1, 'Test', 18),
    ('Test2', 1, 1, 'Test2', 18);--
    -- add 2 orders with you as the customer.
INSERT INTO
    Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
VALUES
    (92, 1, '2018-08-06', 1),
    (92, 1, '2018-08-06', 1);--
    -- delete all customers that have no orders.
DELETE FROM
    Customers
WHERE
    CustomerID NOT IN (
        SELECT
            CustomerID
        FROM
            Orders
    );