-- Database Queries

-- Find all customers with postal code 1010

select * from customers where postalcode = 1010

-- Find the phone number for the supplier with the id 11

select phone from suppliers where supplierid = 11

-- List first 10 orders placed, sorted descending by the order date

select * from orders order by orderdate desc limit 10

-- Find all customers that live in London, Madrid, or Brazil

select * from customers where city = 'London' or city ='Madrid' or country = 'brazil'

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

insert into customers (CustomerName, ContactName, Address, City, PostalCode, Country)
values ('The Shire','Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', 111, 'Middle Earth')

-- Update Bilbo Baggins record so that the postal code changes to "11122"

update customers set Postalcode = 11122 where CustomerID = 92

-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

select distinct city from customers

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
from suppliers where length(supplierName) > 20