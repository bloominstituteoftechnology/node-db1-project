-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM [Customers] where PostalCode ='1010';

-- Find the phone number for the supplier with the id 11
SELECT Phone FROM [Suppliers] where SupplierID='11';

-- List first 10 orders placed, sorted descending by the order date
SELECT OrderDate FROM [Orders] order by OrderDate limit 10;

-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM [Customers] where city='London';
SELECT * FROM [Customers] where city='Madrid';
SELECT * FROM [Customers] where country='Brazil';

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
insert into Customers (CustomerName) values('Bilbo Baggins');
update Customers set Country='The Shire' where CustomerID=92;
update Customers set City='Bag End' where CustomerID=92;
update Customers set Address='1 Hobbit-Hole' where CustomerID=92;

-- Update Bilbo Baggins record so that the postal code changes to "11122"
update Customers set PostalCode='11122' where CustomerID=92;

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted


-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name

