# SQL Exercises

## Topics

- Structured Query Language (SQL)
- Relational Databases
- SQLite
- Writing Basic Queries

## Assignments

# Create a Database Table

- use DB Browser for SQLite to create a database, name it anything you want.
- add an _accounts_ table with the following _schema_:

  - `id`, numeric value with no decimal places that should autoincrement.
  - `name`, string, add whatever is necessary to make searching by name faster.
  - `budget` numeric value.

- constraints
  - the `id` should be the primary key for the table.
  - account `name` should be unique.
  - account `name`, required.

```sql
CREATE TABLE `accounts` (  
  `id`	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,  
  `name`	TEXT NOT NULL UNIQUE,  
  `budget`	REAL  
);
```

# Write Basic Queries

>Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top) and write the following queries:


- ## find all customers with a particular first name.
>
SELECT * FROM [Customers]   
WHERE CustomerName   
LIKE 'Alfreds%'  
>
- ## find all customers that live in London.
>
SELECT *  
FROM Customers  
WHERE City = 'London'  
>
- ## find the phone number for a particular supplier (provide id, or supplier name).
>
SELECT Phone  
FROM [Suppliers]  
WHERE SupplierID = '' OR SupplierName = ''   
>
- ## find all customers in a particular postal code.
>
SELECT *   
FROM [Customers]  
WHERE PostalCode = ''  
>
- ## find all suppliers who have names with more than 20 characters.
>
SELECT *  
FROM [Suppliers]  
WHERE LENGTH(SupplierName) > 20 
<!--   
WHERE SupplierName  
-- Added backticks below, due to MARKDOWN styling `=P`      
LIKE `'%_%_%_%_%_%_%_%_%_%_%_%_%_%_%_%_%_%_%_%_%_'`   
-->  
>
- ## list customers descending by the number of orders.
>>>
SELECT Customers.CustomerName, COUNT(Orders.CustomerID) AS NumberOfOrders FROM Orders  
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID  
GROUP BY CustomerName  
ORDER BY NumberOfOrders DESC  
>>>
- ## list orders descending by the order date.  
>
SELECT *  
FROM [Orders]  
ORDER BY OrderDate DESC  
>   
- ## list orders grouped by customer showing the number of orders per customer.
>
SELECT Customers.CustomerName, COUNT(Orders.CustomerID) AS NumberOfOrders FROM Orders    
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID    
GROUP BY CustomerName  
>
- ## list orders grouped by customer's city showing number of orders per city.
>>>
SELECT Customers.City, COUNT(Customers.City) AS 'Orders Per City' FROM Customers  
JOIN Orders ON Orders.CustomerID = Customers.CustomerID  
GROUP BY Customers.City  
>>>
- ## add a customer using your information.
>
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)  
VALUES ('Tristan', 'Is Cool', '1234 Sesame St', 'Pasadena', '12345', 'Merica')  
>
- ## add 2 products.
>
INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)    
VALUES('Tri-Tip', 1, 1, 'per lb', 15.99);    
>
INSERT INTO Products   
VALUES (79, 'BBQ Sauce', 5, 1, 'per bottle', 5.99);  
>
- ## add 2 orders with you as the customer.
>
INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)     
VALUES (92, 1, '2018-07-31', 1);    
>
INSERT INTO OrderDetails (OrderID, ProductID, Quantity)  
VALUES (10444, 78, 15)  
>>
INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)     
VALUES (92, 1, '2018-07-31', 2);  
>
INSERT INTO OrderDetails (OrderID, ProductID, Quantity)  
VALUES (10444, 79, 1)  
>
- ## delete all customers that have no orders.
>
DELETE FROM Customers  
WHERE CustomerID NOT IN (SELECT CustomerID FROM Orders)  
>
  
  
  
>Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
