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
   - `SELECT * FROM Customers WHERE CustomerName like "Ana%";`

  - find all customers that live in London.
   - ```SELECT * FROM Customers 
    WHERE City is "London";```

  - find the phone number for a particular supplier (provide id, or supplier name).
   - `SELECT Phone FROM Suppliers WHERE SupplierName is "Exotic Liquid";`

  - find all customers in a particular postal code.
   - `SELECT * FROM [Customers] WHERE PostalCode is "05033";`

  - find all suppliers who have names with more than 20 characters.
  - `SELECT * FROM [Suppliers] WHERE length(SupplierName) > 20;`

  - list customers descending by the number of orders.
   - `SELECT customerID, count(*) as orders FROM Orders group by customerid order by count(*) desc`

  - list orders descending by the order date.
   - `SELECT * FROM [Orders] order by orderdate desc`

  - list orders grouped by customer showing the number of orders per customer.
   - `SELECT COUNT(OrderID), CustomerID FROM Orders GROUP BY CustomerID ORDER BY COUNT(OrderID) DESC;`

  - list orders grouped by customer's city showing number of orders per city.
   - 
  - add a customer using your information.
   - `INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES ('Bill','William DiFulvio','123 PArk place','Orlando','32792','USA');`
  - add 2 products.
   - `INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price) Values("Chicken Taco Mix", "4", "2", "5 boxes x 5 bags", "99");`
   - `INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price) Values("Chicken Taco Mix", "4", "2", "5 boxes x 5 bags", "99");`
  - add 2 orders with you as the customer.
   - `INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID) Values("92", "5", "2018-07-30", "2");`
   - `INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID) Values("92", "4", "2018-07-30", "3");`
  - delete all users that have no orders.

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
