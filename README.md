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
  SELECT * FROM Customers
WHERE ContactName LIKE '%Elizabeth%';

  - find all customers that live in London.
  SELECT * FROM Customers where City="London";

  - find the phone number for a particular supplier (provide id, or supplier name).
  SELECT Phone FROM Suppliers Where SupplierID=9;

  - find all customers in a particular postal code.
  SELECT * FROM Customers WHERE PostalCode='12209';

  - find all suppliers who have names with more than 20 characters.
  SELECT * FROM Suppliers WHERE LENGTH(SupplierName) > 20

  - list customers descending by the number of orders.


  - list orders descending by the order date.
  SELECT * FROM Orders ORDER BY OrderDate DESC

  - list orders grouped by customer showing the number of orders per customer.
  SELECT CustomerID, count(*) as orders FROM [Orders] GROUP BY CustomerID;

  - list orders grouped by customer's city showing number of orders per city.


  - add a customer using your information.
  INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES ('Emazing, LLC', 'Em jay', '2218 2nd Ave', 'Seattle', '90101', 'USA');

  - add 2 products.
  INSERT INTO Products ( ProductName, SupplierID, CategoryID, Unit, Price )
  VALUES ( 'Super Absorbent Maxis', 44, 1, '10 boxes x 1 pallet', 49.99 );  INSERT INTO Products ( ProductName, SupplierID, CategoryID, Unit, Price )
  VALUES ( 'Super Absorbent Tampons', 44, 1, '10 boxes x 1 pallet', 19.99 );

  - add 2 orders with you as the customer.
  INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID) VALUES ('100', '7', '2018-07-30', '1'); INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID) VALUES ('101', '4', '2018-07-29', '3');

  - delete all users that have no orders.
  DELETE FROM Customers WHERE CustomerID NOT IN (SELECT CustomerID FROM Orders)


Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
