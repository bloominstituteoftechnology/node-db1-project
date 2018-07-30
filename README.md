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
WHERE ContactName LIKE 'Pedro%';

  - find all customers that live in London.
SELECT * FROM Customers
WHERE City = 'London';

  - find the phone number for a particular supplier (provide id, or supplier name).
SELECT Phone FROM [Suppliers]
WHERE SupplierID = 5;

  - find all customers in a particular postal code.
SELECT * FROM Customers
WHERE PostalCode = '44000';

  - find all suppliers who have names with more than 20 characters.
SELECT * FROM Suppliers
WHERE LENGTH(SupplierName) < 20;

  - list customers descending by the number of orders.
SELECT Orders.CustomerID, Customers.*, count(*) as orders 
FROM Orders 
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID
group by Orders.Customerid 
order by orders DESC;


  - list orders descending by the order date.
SELECT * FROM [Orders]
ORDER BY OrderDate DESC;

  - list orders grouped by customer showing the number of orders per customer.
SELECT CustomerID, count(*) as orders
FROM [Orders]
GROUP BY CustomerID;

  - list orders grouped by customer's city showing number of orders per city.
SELECT Orders.CustomerID, Customers.City, count(*) as orders 
FROM Orders 
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID
GROUP BY Customers.City;

  - add a customer using your information.
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Erin Meredith',	'Erin Meredith',	'8208 Kephart',	'Berrien Springs',	'49103',	'USA');

  - add 2 products.
INSERT INTO Products (ProductName, Unit, Price)
VALUES ('chewing gum', '24 pack', '20');
INSERT INTO Products (ProductName, Unit, Price)
VALUES ('sparkling water', '12 - 12 oz cans', '20');

  - add 2 orders with you as the customer.
INSERT INTO Orders (CustomerID, OrderDate)
VALUES ('92', '2018-07-30');
INSERT INTO OrderDetails (OrderID)
SELECT OrderID FROM Orders
WHERE Orders.CustomerID = 92

  - delete all users that have no orders.
SELECT Orders.CustomerID, Customers.*, count(*) as orders 
FROM Orders 
FULL OUTER JOIN Customers ON Orders.CustomerID=Customers.CustomerID
DELETE FROM Customers
WHERE orders = NULL

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
