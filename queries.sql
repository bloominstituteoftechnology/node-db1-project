-- Database Queries

-- Find all customers with postal code 1010

SELECT * FROM Customers
WHERE PostalCode = 1010

-- Find the phone number for the supplier with the id 11

SELECT * FROM [Suppliers]
WHERE SupplierID = 11

-- List first 10 orders placed, sorted descending by the order date

SELECT * FROM [Orders]
ORDER BY OrderDate
Limit 10

-- Find all customers that live in London, Madrid, or Brazil

SELECT * FROM [Customers]
WHERE City = 'London' OR 'Madrid' OR 'Brazil'

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" 
-- the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

INSERT INTO Customers (Country, CustomerName, ContactName, Address, City, PostalCode)
VALUES ('Middle Earth','Hobbits','Bilbo Baggins','1 Hobbit-Hole','The Shire','111')

-- Update Bilbo Baggins record so that the postal code changes to "11122"

UPDATE [Customers]
SET PostalCode = '11122'
WHERE CustomerName = 'Bilbo Baggins'