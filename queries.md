# Database Queries //MVP Complete //jaklundun// 

## find all customers that live in London. Returns 6 records.

-- SELECT * FROM Customers WHERE city = 'London'

## find all customers with postal code 1010. Returns 3 customers.

-- SELECT * FROM Customers WHERE postalCode = '1010'

## find the phone number for the supplier with the id 11. Should be (010) 9984510.

-- SELECT * FROM Suppliers WHERE supplierID = 11

## list orders descending by the order date. The order with date 1997-02-12 should be at the top.

-- SELECT * FROM orders ORDER BY orderDate DESC

## find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name. Returns 11 records.

-- SELECT * FROM Suppliers WHERE length(supplierName) > 20

## find all customers that include the word "market" in the name. Should return 4 records.

-- SELECT * FROM Customers WHERE customerName LIKE '%market%'

## add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.

-- INSERT INTO customers (customerName, contactName, address, city, postalCode, country) VALUES ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')

## update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.

-- UPDATE customers SET postalCode = '11122' WHERE customerID = 92

## list orders grouped by customer showing the number of orders per customer. _Rattlesnake Canyon Grocery_ should have 7 orders.

-- SELECT customers.customername, count(*) AS "Orders" FROM orders, customers WHERE customers.customerID = orders.customerID GROUP BY orders.customerID

## list customers names and the number of orders per customer. Sort the list by number of orders in descending order. _Ernst Handel_ should be at the top with 10 orders followed by _QUICK-Stop_, _Rattlesnake Canyon Grocery_ and _Wartian Herkku_ with 7 orders each.

-- SELECT customers.customername, count(*) AS "Orders" FROM orders, customers WHERE customers.customerID = orders.customerID GROUP BY orders.customerID ORDER BY orders DESC

## list orders grouped by customer's city showing number of orders per city. Returns 58 Records with _Aachen_ showing 2 orders and _Albuquerque_ showing 7 orders.

-- SELECT customers.city, COUNT(*) AS "Orders" FROM orders, customers WHERE customers.customerID = orders.customerID GROUP BY customers.city

## delete all users that have no orders. Should delete 17 records.

-- DELETE FROM customers WHERE customers.customerID NOT IN (SELECT customers.customerID FROM customers, orders WHERE customers.customerID = orders.customerID)