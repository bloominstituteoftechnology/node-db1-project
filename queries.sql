-- Database Queries

-- Find all customers with postal code 1010

SELECT PostalCode 
FROM Customers
WHERE PostalCode = 1010;
-- Answer: PostalCode
-- 1010
-- 1010
-- 1010

-- Find the phone number for the supplier with the id 11

SELECT Phone 
FROM Suppliers
WHERE SupplierID = 11;
-- Answer: Phone
-- (010) 9984510

-- List first 10 orders placed, sorted descending by the order date

SELECT *
FROM Orders
ORDER BY OrderDate DESC
LIMIT 10;
-- Answer: OrderID	CustomerID	EmployeeID	OrderDate	ShipperID
            -- 10443	66	8	1997-02-12	1
            -- 10442	20	3	1997-02-11	2
            -- 10440	71	4	1997-02-10	2
            -- 10441	55	3	1997-02-10	2
            -- 10439	51	6	1997-02-07	3
            -- 10438	79	3	1997-02-06	2
            -- 10436	7	3	1997-02-05	2
            -- 10437	87	8	1997-02-05	1
            -- 10435	16	8	1997-02-04	2
            -- 10433	60	3	1997-02-03	3

-- Find all customers that live in London, Madrid, or Brazil

-- SELECT City
-- FROM Customers
-- City 'London', 'Madrid', 'Brazil'


-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

-- Update Bilbo Baggins record so that the postal code changes to "11122"

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
