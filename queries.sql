SELECT * FROM Customers;

=	Equal	
>	Greater than	
<	Less than	
>=	Greater than or equal	
<=	Less than or equal	
<>	Not equal. Note: In some versions of SQL this operator may be written as !=	
BETWEEN	Between a certain range	
LIKE	Search for a pattern	
IN	To specify multiple possible values for a column	


ALTER TABLE Customers 
ADD "The Shire" varchar(255);


-- Database Queries

-- Find all customers with postal code 1010

SELECT CustomerID, ContactName, Address, City, PostalCode, Country FROM Customers
WHERE PostalCode='1010';

-- Find the phone number for the supplier with the id 11

SELECT * FROM [Suppliers]
WHERE SupplierID=11
-- List first 10 orders placed, sorted descending by the order date

SELECT * FROM [Orders]  
Order by OrderDate ASC, OrderDate ASC LIMIT 10;
-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM [Customers]  
WHERE Country='Brazil' OR Country='Madrid' OR Country='London'
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" 
-- the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is
--  "Middle Earth"


INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth');

-- Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE Customers
SET PostalCode='11122'
WHERE ContactName='Bilbo Baggins';
-- (Stretch) Find a query to discover how many different cities are stored in the 
--Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. 
-- You can use `length(SupplierName)` to get the length of the name
