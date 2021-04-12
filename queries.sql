-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM customers WHERE postalCode = 1010;
-- Find the phone number for the supplier with the id 11
SELECT phoneNumber FROM supplier WHERE id = 11;
-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM orders ORDER BY orderdate DESC LIMIT 10;
-- Find all customers that live in London, Madrid, or Brazil
SELECT * from customers WHERE city = "London"
OR city = "Madrid"
OR country = "Brazil";
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO customers (customername, contactname, address, postalCode, city, country) VALUES ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "111", "Bag End", "Middle Earth");
-- Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE customers SET postalCode = 11122 WHERE postalCode = 111;
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
SELECT DISTINCT city FROM customers;
-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT * from suppliers WHERE length(SupplierName) > 20;