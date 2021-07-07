-- Database Queries

-- Find all customers with postal code 1010
SELECT 
 *
FROM Customers as C
where C.Postalcode=1010;
-- Find the phone number for the supplier with the id 11
SELECT 
S.phone
FROM Suppliers as S
where S.SupplierID = 11;
-- List first 10 orders placed, sorted descending by the order date
SELECT
*
FROM orders
LIMIT '10';
-- Find all customers that live in London, Madrid, or Brazil
SELECT
*
FROM customers as C
where C.city = 'Madrid' or C.city = 'London' or C.country = 'Brazil';
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
Insert Into Customers(CustomerName, ContactName, Address, City, PostalCode, Country)
Values('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'middle earth');

-- Update Bilbo Baggins record so that the postal code changes to "11122"
Update customers
set postalcode = '11122'
where CustomerID = '92'
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
