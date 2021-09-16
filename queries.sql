-- Database Queries

-- Find all customers with postal code 1010
SELECT * FROM Customers
WHERE PostalCode=1010;
-- Find the phone number for the supplier with the id 11
SELECT Phone FROM Suppliers where SupplierID = 11
-- List first 10 orders placed, sorted descending by the order date
SELECT * FROM Orders order by OrderDate desc limit 10
-- Find all customers that live in London, Madrid, or Brazil
SELECT * FROM Customers, where City in ('London', 'Madrid') or country = 'Brazil"'
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
insert into Customers (CustomerName, ContactName, Address, City, PostalCode, Country) 
values ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')
-- Update Bilbo Baggins record so that the postal code changes to "11122"
update Customers set PostalCode = '11122' where CustomerID = 92
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
select count(distinct(City)) from Customers
-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
select * from Suppliers where length(SupplierName) > 20

db('foo-table') // returns a promise that resolves to an **array** with all records in the table
db('foo-table').where({ role: 'Student', active: true }) // resolves to an **array** of all records that satisfy the where
db('foo-table').where('name', 'Mary') // is an alternative for when there is just one where condition
db('foo-table').where('id', 7).first() // will resolve to the **record** we want (if the id is unique for a table) or undefined
db('foo-table').insert({ bar: 'baz' }) // resolves to an **array** containing the **ids of the records** inserted into the table
db('foo-table').where('id', id).update({ bar: 'new bar' }) // resolves to the **number of records** affected by the update
db('foo-table').where('id', id).delete() // resolves to the **number of records** affected by the delete

https://github.com/JoeyBertschler/node-db1-project
(db1)