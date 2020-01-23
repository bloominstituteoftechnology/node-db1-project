-- Database Queries

-- Find all customers with postal code 1010

SELECT  *  FROM Customer WHERE PostalCode = 1010; -- will give me all the info for the specified customers


-- Find the phone number for the supplier with the id 11

SELECT Phone FROM Supplier WHERE Id = 11;

-- List first 10 orders placed, sorted descending by the order date

SELECT * FROM [Order] Order By OrderDate DESC LIMIT  10 -- using DB browser so I added the square brackets to diferenciate table name from the commands

-- Find all customers that live in London, Madrid, or Brazil

SELECT * FROM Customer WHERE City = 'London' Or City = 'Madrid' Or Country = 'Brazil'; -- Got me looking for a city Brazil which there is not such a city in our DB but a country XD

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

INSERT INTO Customer ( CompanyName, ContactName, Address, City, PostalCode, Country)
VALUES('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', 111, 'Middle Earth')


-- Update Bilbo Baggins record so that the postal code changes to "11122"

UPDATE Customer SET PostalCode = 11122 WHERE CompanyName = 'The Shire';

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted


-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
