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
      - SELECT DISTINCT CustomerName FROM Customers;
  - find all customers that live in London.
      - SELECT * FROM Customers WHERE City = 'London';
  - find the phone number for a particular supplier (provide id, or supplier name).
      - SELECT SupplierName FROM Suppliers WHERE SupplierID = 15;
  - find all customers in a particular postal code.
      - SELECT * FROM Customers WHERE PostalCode = '1010';
  - find all suppliers who have names with more than 20 characters.
      - SELECT * FROM Suppliers WHERE LENGTH(SupplierName) > 20;
  - list customers descending by the number of orders.
      - SELECT * FROM Orders ORDER BY OrderID DESC;
  - list orders descending by the order date.
      - SELECT * FROM Orders ORDER BY OrderDate DESC;
  - list orders grouped by customer showing the number of orders per customer.
      - SELECT CustomerID, COUNT(OrderID) AS Orders FROM Orders GROUP BY CustomerID ORDER BY COUNT(OrderID) DESC;
  - list orders grouped by customer's city showing number of orders per city.
      - SELECT COUNT(Orders.OrderID) AS Orders, Customers.City FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID GROUP BY Customers.City ORDER BY COUNT(Orders.OrderID);
  - add a customer using your information.
      - INSERT INTO Customers (CustomerName, ContactName, Address,City, PostalCode, Country) VALUES ('Lambda','Chheany Mok','Skagen 22','Stavanger','4007','Norway');
  - add 2 products.
      - INSERT INTO Products (ProductName, SupplierID, CategoryID,Unit, Price) VALUES ('Bacon', 4, 6, '18 - 500 g pkgs.', 261);
      - INSERT INTO Products (ProductName, SupplierID, CategoryID,Unit, Price) VALUES ('Chicken', 4, 6, '18 - 500 g pkgs.', 54);
  - add 2 orders with you as the customer.
      - INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID) VALUES (92, 8, '2017-07-30', 2);
      - INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID) VALUES (92, 4, '2017-07-30', 1);
  - delete all customers that have no orders.
      - DELETE FROM Customers WHERE CustomerID NOT IN (SELECT CustomerID FROM Orders);

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
