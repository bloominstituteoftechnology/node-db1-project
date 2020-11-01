-- Database Queries

-- Find all customers with postal code 1010
SELECT * from customers;
where postalCode = 1010;

-- Find the phone number for the supplier with the id 11
SELECT * from suppliers;
where id = 11;

-- List first 10 orders placed, sorted descending by the order date
SELECT * from orders;
order by order date desc;
limit 10;

-- Find all customers that live in London, Madrid, or Brazil
SELECT * from customers;
where city = London, city = Madrid, country = Brazil;

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
SELECT * from customers;
insert into category ( name = Bilbo Baggins, Address = ..., ..., ..., ...);

-- Update Bilbo Baggins record so that the postal code changes to "11122"
SELECT * from customers;
update category set postal code = 11122; --//added after filtered for bilbo
where name = Bilbo Baggins;


-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
