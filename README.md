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
    SELECT * FROM Customers where customerName like'An%';

  - find all customers that live in London.
    SELECT * FROM Customers where city = 'London';

  - find the phone number for a particular supplier (provide id, or supplier name).
    SELECT phone FROM [Suppliers] where supplierName = 'Exotic Liquid'

  - find all customers in a particular postal code.
    SELECT * FROM [Customers] where postalCode = '12209'

  - find all suppliers who have names with more than 20 characters.
    SELECT * FROM [Suppliers] where LENGTH(supplierName) > 20

  - list customers descending by the number of orders.
    SELECT Customers.CustomerName, COUNT(Orders.OrderID) AS Orders FROM Orders
    LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    GROUP BY CustomerName
    ORDER BY Orders DESC

  - list orders descending by the order date.
    SELECT * FROM [Orders] order by orderDate desc

  - list orders grouped by customer showing the number of orders per customer.
    SELECT Customers.CustomerName, COUNT(Orders.OrderID) AS Orders FROM Orders
    LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    GROUP BY CustomerName
    ORDER BY Orders DESC

  - list orders grouped by customer's city showing number of orders per city.
    SELECT Customers.City, COUNT(Orders.OrderID) AS Orders FROM Orders
    LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    GROUP BY City
    ORDER BY Orders DESC

  - add a customer using your information
    INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
    VALUES ('Test Name', 'Test Contact Name', 'Skagen 21', 'Stavanger', '4006', 'Norway');

  - add 2 products.
    INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
    VALUES ('Product Test Name', 6, 5, '10 boxes x 20 bags', 20);

    INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
    VALUES ('Product Test Name 2', 7, 6, '10 boxes x 20 bags', 20);

  - add 2 orders with you as the customer.
    INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
    VALUES (94, 5, '2018-07-30', 2)

    INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
    VALUES (94, 5, '2018-07-30', 2)

  - delete all users that have no orders.
    DELETE FROM Customers
    WHERE CustomerID NOT IN (SELECT CustomerId from Orders)

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
