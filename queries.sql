-- Database Queries

-- Find all customers with postal code 1010

SELECT * FROM Customers
WHERE PostalCode = '1010';

-- Find the phone number for the supplier with the id 11

SELECT Phone FROM Suppliers
WHERE SupplierID = '11';

-- List first 10 orders placed, sorted descending by the order date

SELECT * FROM Orders
WHERE OrderID <= '10257'
ORDER BY OrderDate LIMIT 10

-- Find all customers that live in London, Madrid, or Brazil

SELECT * FROM Customers
WHERE City = 'Madrid' OR City = 'London' OR Country = 'Brazil';

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

INSERT into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('The Shire', 'Bilbo Baggins', '1-Hobbit-Hole', 'Bag End', '111', 'Middle Earth')

-- checked (correct) --
SELECT * FROM [Customers]
WHERE CustomerName = 'The Shire';

-- Update Bilbo Baggins record so that the postal code changes to "11122"

UPDATE Customers 
SET PostalCode = '11122'
WHERE CustomerID = '92';

-- checked (correct) --
SELECT * FROM [Customers]
WHERE CustomerName = 'The Shire';

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

SELECT COUNT (DISTINCT City) from Customers;

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name

SELECT * FROM Suppliers
WHERE LENGTH(SupplierName) > 20;

-- NOTES FROM CLASS --
SELECT *
FROM customers
where city = 'Paris' or country = 'Gemany';


SELECT *
FROM customers
order by country, city;

-- see a list of the first 5 customers sort the results by country
SELECT *
FROM customers
order by country
limit 5;

-- see a list of the first 5 customers sort the results by country descending
SELECT *
FROM customers
order by country desc
limit 5;

-- add data to tables
insert into Categories (categoryName, description)
values ('microsoft products', 'the most microsofty products on the market');

-- update a record
update categories
	set categoryName = 'Apple Products'
where categoryId = 9; -- do not forget the where when updating or all records will be updated

-- removing records
delete from categories 
where categoryId = 9; -- do not forget the where when deleting or all records will be deleted