-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM Customers
WHERE PostalCode=1010;

-- Find the phone number for the supplier with the id 11
SELECT Phone FROM Suppliers
WHERE SupplierID=11;

-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM Orders
WHERE OrderID<=10257
ORDER BY OrderDate DESC;
--NOT HAPPY WITH THE "WHERE" use, look for bettwe way.

-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM Customers
WHERE City="London" OR City="Madrid" OR Country="Brazil";

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", 111, "Middle Earth");

insert into Customers (Country, CustomerName, ContactName, Address, City, PostalCode)
values ('USA', 'Lambda School', 'Austen Allred', '1 Lambda Court', 'Provo', '84601');

INSERT INTO Customers (Country, CustomerName, ContactName, Address, City, PostalCode)
VALUES ("Middle Earth", "The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", 111);
--WHY must "Country" be first?


-- Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE Customers SET PostalCode = 11122 where CustomerID=92;


-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
