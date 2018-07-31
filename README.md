# SQL Exercises 

## Topics

- Structured Query Language (SQL)
- Relational Databases
- SQLite
- Writing Basic Queries

## Assignments

### Create a Database Table

- use DB Browser for SQLite to create a database, name it anything you want.
- add an _accounts_ table with the following _schema_:

  - `id`, numeric value with no decimal places that should autoincrement.
  - `name`, string, add whatever is necessary to make searching by name faster.
  - `budget` numeric value.

- constraints
  - the `id` should be the primary key for the table.
  - account `name` should be unique.
  - account `name`, required.

### Write Basic Queries

- Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top) and write the following queries:
  - find all customers with a particular first name.
```
SELECT * FROM Customers
WHERE CustomerName LIKE 'Reggiani%'
```
  - find all customers that live in London.
```
SELECT * FROM Customers
WHERE City = 'London'
```
  - find the phone number for a particular supplier (provide id, or supplier name).
```
SELECT Phone FROM Suppliers
WHERE SupplierName = 'Tokyo Traders'
```
  - find all customers in a particular postal code.
```
SELECT * FROM Customers
WHERE PostalCode = 67000
```
  - find all suppliers who have names with more than 20 characters.
```
SELECT * FROM Suppliers
WHERE LENGTH(SupplierName) > 20
```
  - list customers descending by the number of orders.
```
SELECT c.* FROM Orders o
INNER JOIN Customers c ON c.CustomerID = o.CustomerID
GROUP BY o.CustomerID
ORDER BY COUNT(*) DESC;
```
  - list orders descending by the order date.
```
SELECT * FROM Orders
ORDER BY OrderDate DESC;
```
  - list orders grouped by customer showing the number of orders per customer.
```
SELECT *, Count(OrderID) as NumberOfOrders FROM Orders
GROUP BY CustomerID;
```
  - list orders grouped by customer's city showing number of orders per city.
  _This needs clarification._
```
SELECT o.*, Count(o.OrderID) as NumberOfOrders FROM Orders o
INNER JOIN Customers c ON c.CustomerID = o.CustomerID
GROUP BY o.CustomerID
ORDER BY COUNT(*) DESC;
```
  - add a customer using your information.
```
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Tysonism Inc.', 'Tyson G', '1 Lambda Way', 'Honolulu', 96801, 'USA');
```
  - add 2 products.
```
INSERT INTO Products ( ProductName, SupplierID,	CategoryID,	Unit, Price ) 
VALUES ( 'Fan', 1, 1, '16 oz', 99.99 ), 
( 'Couch', 2, 2, '260 lbs', 2000 );
```
  - add 2 orders with you as the customer.
```
INSERT INTO Orders ( CustomerID, EmployeeID, OrderDate, ShipperID ) 
VALUES ( 92, 4, '2018-07-29', 4 ), 
( 92, 5, '2018-07-30', 5 );
```
  - delete all users that have no orders.
```
DELETE FROM Customers
WHERE CustomerID 
NOT IN (SELECT CustomerID FROM Orders)
```

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.