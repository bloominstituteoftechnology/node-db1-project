-- Database Queries

-- Find all customers with postal code 1010
Select * from customers where postalCode = '1010'

-- Find the phone number for the supplier with the id 11
SELECT supplierName, phone FROM Suppliers where SupplierID = 11;
-- List first 10 orders placed, sorted descending by the order date
SELECT OrderID, OrderDate from Orders ORDER BY OrderDate DESC LIMIT 10
-- Find all customers that live in London, Madrid, or Brazil
Select * from customers where country in ('Brazil') or city in ('London', 'Madrid')
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
insert into Customers Values('92','The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')
-- Update Bilbo Baggins record so that the postal code changes to "11122"
update customers set postalCode = '11122' where ContactName = 'Bilbo Baggins'
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
select city, count(city) from customers group by city order by city
-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
Select SupplierName, LENGTH(SupplierName) from suppliers where LENGTH(SupplierName) > 20