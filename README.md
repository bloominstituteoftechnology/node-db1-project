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

  `SELECT * FROM Customers WHERE CustomerName LIKE 'Hungry%';`

  - find all customers that live in London.

  `SELECT * FROM Customers WHERE City = 'London';`

  - find the phone number for a particular supplier (provide id, or supplier name).

  `SELECT Phone FROM Suppliers WHERE SupplierName = 'Specialty Biscuits, Ltd.';`

  - find all customers in a particular postal code.

  `SELECT * FROM Customers WHERE PostalCode = 'T2F 8M4';`

  - find all suppliers who have names with more than 20 characters.

  `SELECT * FROM Suppliers WHERE LENGTH(SupplierName) > 20;`

  - list customers descending by the number of orders.

  `SELECT CustomerName, COUNT(OrderID) AS Orders FROM Orders
   JOIN Customers ON Orders.CustomerID = Customers.CustomerID
   GROUP BY Customers.CustomerID
   ORDER BY Orders DESC;`

  - list orders descending by the order date.

  `SELECT * FROM Orders ORDER BY OrderDate DESC;`

  - list orders grouped by customer showing the number of orders per customer.

  `SELECT COUNT(OrderID) AS Orders, CustomerName FROM Orders
   JOIN Customers ON Orders.CustomerID = Customers.CustomerID
   GROUP BY Customers.CustomerID;`

  - list orders grouped by customer's city showing number of orders per city.

  `SELECT COUNT(OrderID) AS Orders, City FROM Orders
   JOIN Customers ON Orders.CustomerID = Customers.CustomerID
   GROUP BY City;`

  - add a customer using your information.

  `INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
   VALUES ('Affordances', 'Gabriel Duquette', '25 Saddle Ridge Dr', 'West Hartford, CT', '06117', 'USA');`

  - add 2 products.

  `INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
   VALUES ('Small Candied Hams', 7, 3, '10,000 tons', '1');
   INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
   VALUES ('Sugared Beef', 7, 3, '10,000 tons', '1');`

  - add 2 orders with you as the customer.

  `INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
   VALUES ('92', '1', '2000-01-01', '1');
   INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
   VALUES ('92', '1', '2000-01-02', '1');`

  - delete all customers that have no orders.

  `DELETE FROM Customers WHERE CustomerID NOT IN (SELECT CustomerId from Orders);`

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
