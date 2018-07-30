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
  - - SELECT \* FROM [Customers]
      where ContactName like 'Maria%'

  - find all customers that live in London.
  - - SELECT \* FROM [Customers]
      where City = 'London'

  - find the phone number for a particular supplier (provide id, or supplier name).
  - - SELECT Phone FROM [Suppliers]
      where SupplierID = 7

  - find all customers in a particular postal code.
  - - SELECT \* FROM [Customers]
      where PostalCode = '05023'

  - find all suppliers who have names with more than 20 characters.
  - - DATALENGTH(SupplierName) or LEN(SupplierName) only work in SQLServer. Searching for equivelant

  - list customers descending by the number of orders.
  - - SELECT CustomerID, COUNT(\*) as Quantity
      FROM [Orders]
      GROUP BY CustomerId
      ORDER BY Quantity DESC

  - list orders descending by the order date.
  - - SELECT \*
      FROM [Orders]
      ORDER BY OrderDate DESC

  - list orders grouped by customer showing the number of orders per customer.
  - - SELECT \*, COUNT(\*) as Quantity
      FROM [Orders]
      GROUP BY CustomerId
      ORDER BY Quantity DESC

  - list orders grouped by customer's city showing number of orders per city.
  - - SELECT City, COUNT(\*) AS Quantity
      FROM [Customers]
      GROUP BY City

  - add a customer using your information.
  - - INSERT INTO [Customers] (CustomerName, ContactName, Address, City, PostalCode, Country)
      VALUES ('Lord Nikon', 'Kevin Brack', '123 Noneya Bz.', 'Nonya', '12345', 'USA');

  - add 2 products.
  - - INSERT INTO[Products](ProductName, SupplierID, CategoryID, Unit, Price)
      VALUES ('Hot Dog Casings', '4', '3', '1000 Feet In A Tub', '6'), ('Peanut Butter Sauce', '5', '2', '16 oz jars', '18')

  - add 2 orders with you as the customer.
  - - INSERT INTO [Orders](CustomerID, EmployeeId, OrderDate, ShipperId)
      VALUES ('92', '4', '2018-07-30', '2'), ('92', '5', '2017-10-12', '3')

  - delete all users that have no orders.

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.

TEMP

- SELECT Country, City, \*
  FROM Customers
  ORDER BY Country, City DESC

- SELECT Country, COUNT(\*) AS Quantity
  FROM Customers
  GROUP BY Country
