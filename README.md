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
  - find all customers with a particular first name. <br>
  `SELECT * FROM Customers where CustomerName = 'Hungry Owl All-Night Grocers';` <br>
  - find all customers that live in London. <br>
  `SELECT * FROM Customers where City = 'London';` <br>
  - find the phone number for a particular supplier (provide id, or supplier name). <br>
  `SELECT * FROM Suppliers where SupplierId = 1;` <br>
  - find all customers in a particular postal code. <br>
  `SELECT * FROM Customers where PostalCode = 'H1J 1C3';` <br>
  - find all suppliers who have names with more than 20 characters. <br>
  `SELECT * FROM suppliers WHERE LENGTH("suppliername") > 20` <br>
  - list customers descending by the number of orders. <br>
  `SELECT COUNT(CustomerID), CustomerId` <br>
  `FROM Orders` <br>
  `GROUP BY CustomerId` <br>
  `ORDER BY COUNT(CustomerID) DESC;` <br>
  - list orders descending by the order date. <br>
  `SELECT * FROM Orders <br>`
  `ORDER BY OrderDate desc; <br>`
  - list orders grouped by customer showing the number of orders per customer. <br>
  `SELECT COUNT(CustomerID), CustomerId` <br>
  `FROM Orders` <br>
  `GROUP BY CustomerId` <br>
  `ORDER BY COUNT(CustomerID) DESC;` <br>
  - list orders grouped by customer's city showing number of orders per city.
  - add a customer using your information. <br>
  `INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)` <br>
  `VALUES ('Mark', 'Mark', '123 Address St', 'Austin', '78731', 'USA');` <br>
  - add 2 products. <br>
  `INSERT INTO Products (ProductName, SupplierId, CategoryId, Unit, Price)` <br>
  `VALUES ('Thing', 1, 1, '1 pallete', '8500');` <br>
  - add 2 orders with you as the customer. <br>
  `INSERT INTO Orders (CustomerId, EmployeeId, OrderDate, ShipperId)` <br>
  `VALUES (93, 5, '2018-07-30', 3);` <br>
  - delete all users that have no orders. <br>
  `DELETE FROM Customers` <br>
  `WHERE CustomerId NOT IN (SELECT CustomerId FROM Orders);`

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
