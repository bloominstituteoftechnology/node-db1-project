-- Database Queries

-- Find all customers with postal code 1010


SELECT PostalCode, CustomerName FROM [Customers]
where PostalCode = '1010';

-- Find the phone number for the supplier with the id 11
SELECT Phone FROM [Suppliers]
where SupplierID = 11;

-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM [Orders]
order by OrderDate desc
limit 10

-- Find all customers that live in London, Madrid, or Brazil

SELECT CustomerId, City FROM [Customers]
where Country = 'Brazil' or City = 'London' or City = 'Madrid';

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
insert into [Customers] (Country, CustomerName, ContactName, Address, City, PostalCode)
values ('Middle Earth', 'Bilbo Baggins', 'The Shire', '1 Hobbit-Hole', 'Bag End', '111' );
-- Update Bilbo Baggins record so that the postal code changes to "11122"
update Customers
set PostalCode = '11122'
where CustomerID = 92 ;
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
SELECT COUNT(DISTINCT City) FROM Customers; /*Just gives total */
 SELECT DISTINCT City FROM Customers;   /*shows each indidvidual value*/


-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT * FROM [Suppliers]
where length (SupplierName) > 20;