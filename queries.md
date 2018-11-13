# Database Queries

## find all customers that live in London. Returns 6 records.

select city from customers where city = 'London'

## find all customers with postal code 1010. Returns 3 customers.

SELECT * FROM [Customers] where postalcode = '1010'

## find the phone number for the supplier with the id 11. Should be (010) 9984510.

SELECT * FROM [Suppliers] where supplierID = 11

## list orders descending by the order date. The order with date 1997-02-12 should be at the top.

select * from orders order by orderDate desc

## find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name. Returns 11 records.

SELECT * FROM [Suppliers] where length(supplierName) > 20

## find all customers that include the word "market" in the name. Should return 4 records.

select * 
from customers
where customerName like '%Market%'

## add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.

insert into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth');

## update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.

update customers
set postalCode = '11122'
where customerId = 92;

## list orders grouped by customer showing the number of orders per customer. _Rattlesnake Canyon Grocery_ should have 7 orders.

## list customers names and the number of orders per customer. Sort the list by number of orders in descending order. _Ernst Handel_ should be at the top with 10 orders followed by _QUICK-Stop_, _Rattlesnake Canyon Grocery_ and _Wartian Herkku_ with 7 orders each.

## list orders grouped by customer's city showing number of orders per city. Returns 58 Records with _Aachen_ showing 2 orders and _Albuquerque_ showing 7 orders.

## delete all users that have no orders. Should delete 17 records.
