-- Database Queries
-- Find all customers with postal code 1010
SELECT * 
FROM [Customers]
WHERE PostalCode=1010
-- Find the phone number for the supplier with the id 11
SELECT * 
FROM [Suppliers]
WHERE SupplierID = 11
-- List first 10 orders placed, sorted descending by the order date
SELECT * 
FROM [Orders]
ORDER BY orderDate desc;
-- Find all customers that live in London, Madrid, or Brazil
SELECT * 
FROM [Customers]
WHERE City = 'London' or City = 'Madrid' or Country = 'Brazil';
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO [Customers] ( CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('The Shire', 'Bilbo Baggins', '1 Hobbit Hole', 'Bag End', '111', 'Middle Earth');