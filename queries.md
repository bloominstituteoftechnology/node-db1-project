# Database Queries

## find all customers that live in London. Returns 6 records.
CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country<br>
4	Around the Horn	Thomas Hardy	120 Hanover Sq.	London	WA1 1DP	UK<br>
11	B's Beverages	Victoria Ashworth	Fauntleroy Circus	London	EC2 5NT	UK<br>
16	Consolidated Holdings	Elizabeth Brown	Berkeley Gardens 12 Brewery	London	WX1 6LT	UK<br>
19	Eastern Connection	Ann Devon	35 King George	London	WX3 6FW	UK<br>
53	North/South	Simon Crowther	South House 300 Queensbridge	London	SW7 1RZ	UK<br>
72	Seven Seas Imports	Hari Kumar	90 Wadhurst Rd.	London	OX15 4NB	UK<br>

## find all customers with postal code 1010. Returns 3 customers.
CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country<br>
12	Cactus Comidas para llevar	Patricio Simpson	Cerrito 333	Buenos Aires	1010	Argentina<br>
54	Océano Atlántico Ltda.	Yvonne Moncada	Ing. Gustavo Moncada 8585 Piso 20-A	Buenos Aires	1010	Argentina<br>
64	Rancho grande	Sergio Gutiérrez	Av. del Libertador 900	Buenos Aires	1010	Argentina<br>

## find the phone number for the supplier with the id 11. Should be (010) 9984510.
Found: (010) 9984510
## list orders descending by the order date. The order with date 1997-02-12 should be at the top.
OrderID	CustomerID	EmployeeID	OrderDate	ShipperID<br>
10443	66	8	1997-02-12	1<br>
10442	20	3	1997-02-11	2<br>
10440	71	4	1997-02-10	2<br>
10441	55	3	1997-02-10	2<br>
10439	51	6	1997-02-07	3<br>
10438	79	3	1997-02-06	2<br>

## find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name. Returns 11 records.
SupplierID	SupplierName	ContactName	Address	City	PostalCode	Country	Phone<br>
2	New Orleans Cajun Delights	Shelley Burke	P.O. Box 78934	New Orleans	70117	USA	(100) 555-4822<br>
3	Grandma Kelly's Homestead	Regina Murphy	707 Oxford Rd.	Ann Arbor	48104	USA	(313) 555-5735<br>
5	Cooperativa de Quesos 'Las Cabras'	Antonio del Valle Saavedra	Calle del Rosal 4	Oviedo	33007	Spain	(98) 598 76 54<br>
8	Specialty Biscuits, Ltd.	Peter Wilson	29 King's Way	Manchester	M14 GSD	UK	(161) 555-4448<br>
10	Refrescos Americanas LTDA	Carlos Diaz	Av. das Americanas 12.890	São Paulo	5442	Brazil	(11) 555 4640<br>
11	Heli Süßwaren GmbH & Co. KG	Petra Winkler	Tiergartenstraße 5	Berlin	10785	Germany	(010) 9984510<br>
12	Plutzer Lebensmittelgroßmärkte AG	Martin Bein	Bogenallee 51	Frankfurt	60439	Germany	(069) 992755<br>
13	Nord-Ost-Fisch Handelsgesellschaft mbH	Sven Petersen	Frahmredder 112a	Cuxhaven	27478	Germany	(04721) 8713<br>
14	Formaggi Fortini s.r.l.	Elio Rossi	Viale Dante, 75	Ravenna	48100	Italy	(0544) 60323<br>
18	Aux joyeux ecclésiastiques	Guylène Nodier	203, Rue des Francs-Bourgeois	Paris	75004	France	(1) 03.83.00.68<br>
19	New England Seafood Cannery	Robb Merchant	Order Processing Dept. 2100 Paul Revere Blvd.	Boston	02134	USA	(617) 555-3267<br>
## find all customers that include the word "market" in the name. Should return 4 records.
CustomerID	CustomerName	ContactName	Address	City	PostalCode	Country<br>
10	Bottom-Dollar Marketse	Elizabeth Lincoln	23 Tsawassen Blvd.	Tsawassen	T2F 8M4	Canada<br>
32	Great Lakes Food Market	Howard Snyder	2732 Baker Blvd.	Eugene	97403	USA<br>
71	Save-a-lot Markets	Jose Pavarotti	187 Suffolk Ln.	Boise	83720	USA<br>
89	White Clover Markets	Karl Jablonski	305 - 14th Ave. S. Suite 3B	Seattle	98128	USA<br>
## add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.
Worked<br>
INSERT INTO Customers<br>
VALUES (93,"The Shire","Bilbo Baggins","1 Hobbit-Hole","Bag End","111","Middle Earth")<br>

## update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.
Worked<br>
UPDATE customers<br>
SET PostalCode="11122"<br>
WHERE CustomerID=92;<br>
## list orders grouped by customer showing the number of orders per customer. _Rattlesnake Canyon Grocery_ should have 7 orders.
Worked<br>
SELECT Customers.CustomerName, COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders<br>
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID<br>
GROUP BY CustomerName;<br>

## list customers names and the number of orders per customer. Sort the list by number of orders in descending order. _Ernst Handel_ should be at the top with 10 orders followed by _QUICK-Stop_, _Rattlesnake Canyon Grocery_ and _Wartian Herkku_ with 7 orders each.
Worked<br>
SELECT Customers.CustomerName, COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders <br>
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID<br>
GROUP BY CustomerName<br>
ORDER BY NumberOfOrders DESC;<br>

## list orders grouped by customer's city showing number of orders per city. Returns 58 Records with _Aachen_ showing 2 orders and _Albuquerque_ showing 7 orders.
Worked<br>
SELECT Customers.City, COUNT(Orders.OrderID) AS NumberOfOrders FROM Orders<br>
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID<br>
GROUP BY Customers.City<br>
ORDER BY Customers.City;<br>
## delete all users that have no orders. Should delete 17 records.
KEEP GETTING SYNTAX ERROR <br>
DELETE FROM [Customers]<br>
WHERE CustomerID IN<br>
  (<br>
    SELECT Customers.CustomerID, COUNT(Orders.OrderID) AS NumberOfOrders FROM Customers<br>
	LEFT JOIN orders ON Customers.CustomerID = Orders.CustomerID 
	GROUP BY CustomerName
	ORDER BY NumberOfOrders;
    WHERE NumberOfOrders = 0
  );