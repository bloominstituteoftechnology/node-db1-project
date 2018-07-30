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
SELECT * FROM Customers WHERE CustomerName LIKE '%ap%'

  - find all customers that live in London.
SELECT * from Customers where city='London'

  - find the phone number for a particular supplier (provide id, or supplier name).
SELECT Phone FROM Suppliers WHERE SupplierID =2 or
SELECT Phone FROM Suppliers WHERE SupplierName ='Tokyo Traders'

  - find all customers in a particular postal code.
SELECT * FROM Customers WHERE PostalCode = 44000

  - find all suppliers who have names with more than 20 characters.
SELECT * FROM Suppliers WHERE Length(SupplierName) > 20

  - list customers descending by the number of orders.
SELECT COUNT(OrderID), CustomerID
  FROM orders
  GROUP BY CustomerID
  ORDER BY COUNT(OrderID) DESC

  - list orders descending by the order date.
SELECT * FROM Orders order by OrderDate desc

  - list orders grouped by customer showing the number of orders per customer.
SELECT COUNT(OrderID), CustomerID
FROM Orders
GROUP BY CustomerID

  - list orders grouped by customer's city showing number of orders per city.
SELECT count(OrderID), City
FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY Customers.City

  - add a customer using your information.
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('James Joe', 'Harry', '111 Street', 'San Diego', 11111, 'USA')

  - add 2 products.
 INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
VALUES ('Chips', 1, 1, '5 boxes', 20);

INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
VALUES ('Sweets', 2, 2, '4 boxes', 5)

  - add 2 orders with you as the customer.
INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
VALUES (92, 6, '2018-07-30', 3)

INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
VALUES (92, 9, '2018-07-30', 1)

  - delete all users that have no orders.


Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
