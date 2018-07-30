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
  - find all customers with a particular first name. Answer: SELECT * FROM Customers WHERE ContactName LIKE 'Thomas %';
  - find all customers that live in London. Answer: SELECT * FROM Customers WHERE City = 'London';
  - find the phone number for a particular supplier (provide id, or supplier name). SELECT SupplierID, SupplierName, Phone FROM Suppliers WHERE SupplierID = 4;
  - find all customers in a particular postal code. SELECT * FROM Customers WHERE PostalCode = 12209;
  - find all suppliers who have names with more than 20 characters. SELECT * FROM Suppliers WHERE LENGTH(SupplierName) > 20;
  - list customers descending by the number of orders. SELECT Customers.CustomerID, Customers.CustomerName, COUNT(*) as Orders FROM ORDERS INNER JOIN Customers ON Customers.CustomerID = Orders.CustomerID GROUP BY Customers.CustomerID ORDER BY Orders DESC;
  - list orders descending by the order date. SELECT * FROM Orders ORDER BY OrderDate DESC;
  - list orders grouped by customer showing the number of orders per customer. SELECT Customers.CustomerID, Customers.CustomerName, COUNT(*) as Orders FROM ORDERS INNER JOIN Customers ON Customers.CustomerID = Orders.CustomerID GROUP BY Customers.CustomerID;
  - list orders grouped by customer's city showing number of orders per city. SELECT Customers.City, COUNT(*) AS Orders FROM Customers INNER JOIN Orders ON Customers.CustomerID = Orders.CustomerID GROUP BY Customers.City;
  - add a customer using your information. INSERT INTO Customers VALUES(616, 'Kamry Bowman', 'Kamry Bowman', '25 E. 11th', 'Denver', 80203, 'USA');
  - add 2 products. INSERT INTO Products(ProductName, SupplierID, CategoryID, Unit, Price) VALUES ('Hat Spice', 1, 3, '2 gobs', 1), ('Shoe Roux', 1, 4, '1 magazine', 99.99);
  - add 2 orders with you as the customer.
  INSERT INTO Orders(CustomerID, EmployeeID, OrderDate, ShipperID) VALUES (616, 4, DATE('now'), 3), (616, 4, DATE('now'), 4);
  INSERT INTO OrderDetails(OrderID, ProductID, Quantity) VALUES ((SELECT OrderID FROM Orders WHERE CustomerID = 616 AND ShipperID = 3), 14, 3), ((SELECT OrderID FROM Orders WHERE CustomerID = 616 AND ShipperID = 4), 51, 20);
  - delete all users that have no orders. DELETE FROM Customers WHERE Customers.CustomerID NOT IN (SELECT CustomerID FROM Orders);

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
