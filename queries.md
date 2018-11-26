# Database Queries

## find all customers that live in London. Returns 6 records.

SELECT * FROM [Customers]
where City = 'London'


CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country
4	Around the Horn	Thomas Hardy	120 Hanover Sq.	London	WA1 1DP	UK
11	B's Beverages	Victoria Ashworth	Fauntleroy Circus	London	EC2 5NT	UK
16	Consolidated Holdings	Elizabeth Brown	Berkeley Gardens 12 Brewery	London	WX1 6LT	UK
19	Eastern Connection	Ann Devon	35 King George	London	WX3 6FW	UK
53	North/South	Simon Crowther	South House 300 Queensbridge	London	SW7 1RZ	UK
72	Seven Seas Imports	Hari Kumar	90 Wadhurst Rd.	London	OX15 4NB	UK

## find all customers with postal code 1010. Returns 3 customers.

SELECT * FROM [Customers]
where PostalCode = '1010'


CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country
12	Cactus Comidas para llevar	Patricio Simpson	Cerrito 333	Buenos Aires	1010	Argentina
54	Océano Atlántico Ltda.	Yvonne Moncada	Ing. Gustavo Moncada 8585 Piso 20-A	Buenos Aires	1010	Argentina
64	Rancho grande	Sergio Gutiérrez	Av. del Libertador 900	Buenos Aires	1010	Argentina


## find the phone number for the supplier with the id 11. Should be (010) 9984510.

SELECT * FROM [Suppliers]
where supplierID = '11'


SupplierID	SupplierName	ContactName	Address	City	PostalCode	Country	Phone
11	Heli Süßwaren GmbH & Co. KG	Petra Winkler	Tiergartenstraße 5	Berlin	10785	Germany	(010) 9984510

## list orders descending by the order date. The order with date 1997-02-12 should be at the top.

SELECT * FROM [Orders]
order by OrderDate desc

## find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name. Returns 11 records.

SELECT * FROM [Suppliers]
where length(SupplierName) > 20

## find all customers that include the word "market" in the name. Should return 4 records.

SELECT * FROM [Customers]
where CustomerName like '%market%'

## add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.

insert into Customers  (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('the shire', 'bilbo baggins', '1 Hobbit-Hole', 'Bag end', '1111', 'middle earth');



## update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.

UPDATE Customers
SET postalCode = '11122'
WHERE CustomerID = 92;

## list orders grouped by customer showing the number of orders per customer. _Rattlesnake Canyon Grocery_ should have 7 orders.

SELECT  orderID, customerName, *
FROM customers , orders
GROUP BY customerName       incomplete

## list customers names and the number of orders per customer. Sort the list by number of orders in descending order. _Ernst Handel_ should be at the top with 10 orders followed by _QUICK-Stop_, _Rattlesnake Canyon Grocery_ and _Wartian Herkku_ with 7 orders each.

## list orders grouped by customer's city showing number of orders per city. Returns 58 Records with _Aachen_ showing 2 orders and _Albuquerque_ showing 7 orders.

## delete all users that have no orders. Should delete 17 records.
