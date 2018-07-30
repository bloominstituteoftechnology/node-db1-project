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
  SELECT * FROM Customers WHERE CustomerName LIKE 'Alfreds%'

  - find all customers that live in London.
  SELECT * FROM Customers WHERE City is 'Berlin'

  - find the phone number for a particular supplier (provide id, or supplier name).
  SELECT Phone FROM Suppliers WHERE SupplierName='Exotic Liquid'

  - find all customers in a particular postal code.
  SELECT * FROM Customers WHERE PostalCode=12209

  - find all suppliers who have names with more than 20 characters.
  SELECT * FROM Suppliers WHERE LENGTH(SupplierName) >20

  - list customers descending by the number of orders.

  - list orders descending by the order date.
  SELECT * FROM Orders ORDER BY OrderDate DESC

  - list orders grouped by customer showing the number of orders per customer.
  SELECT CustomerID, COUNT(OrderID) AS orders FROM Orders GROUP BY CustomerID ORDER BY COUNT(OrderID) DESC

  - list orders grouped by customer's city showing number of orders per city.
  SELECT COUNT(OrderID), City FROM Customers, OrderDetails GROUP BY City ORDER BY COUNT(OrderID) DESC;

  - add a customer using your information.
  INSERT INTO Customers VALUES( 92, 'Jennifer', 'Jennifer Player', '10095 Address Lane', 'Hotlanta', '30076', 'USA')

  - add 2 products.
  INSERT INTO Products VALUES( 78, 'Java Monster Mean Bean', 2, 4, '20 15 oz cans', 35)
  INSERT INTO Products VALUES( 78, 'Java Monster Salted Caramel', 2, 4, '20 15 oz cans', 40)

  - add 2 orders with you as the customer.
  INSERT INTO Orders VALUES( 10444, 108, 4, 2018-07-29, 2)
  INSERT INTO Orders VALUES( 10445, 108, 4, 2018-07-30, 2)

  - delete all customers that have no orders.
  DELETE FROM Customers WHERE CustomerID NOT IN (SELECT CustomerID FROM Orders)

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
