-- Database Queries

-- Find all customers with postal code 1010

select * from Customers
where PostalCode = '1010'; 

-- Find the phone number for the supplier with the id 11

SELECT SupplierID, Phone  FROM [Suppliers]
where SupplierID = '11';

-- List first 10 orders placed, sorted descending by the order date

select * from Orders
order by OrderDate desc

-- Find all customers that live in London, Madrid, or Brazil

SELECT Country,City 
FROM Customers
where Country = 'Brazil'
or City in ('London', 'Madrid');


-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

insert into customers
values ('0', 'The Shire', 'Bilbo Baggins', ' 1 hobbit-hole', 'bag end', 'middleEarth');
-- Update Bilbo Baggins record so that the postal code changes to "11122"


Update Customers
set PostalCode = '11122'
where ContactName = 'Bilbo Baggins';


-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
