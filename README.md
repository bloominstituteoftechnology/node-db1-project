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
  - find all customers that live in London.
  - find the phone number for a particular supplier (provide id, or supplier name).
  - find all customers in a particular postal code.
  - find all suppliers who have names with more than 20 characters.
  - list customers descending by the number of orders.
  - list orders descending by the order date.
  - list orders grouped by customer showing the number of orders per customer.
  - list orders grouped by customer's city showing number of orders per city.
  - add a customer using your information.
  - add 2 products.
  - add 2 orders with you as the customer.
  - delete all customers that have no orders.

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.

// Queries Used
 - find all customers with a particular first name. 
  Select ContactName from Customers
  Where ContactName like 'Antonio%'

  - find all customers that live in London.
  Select CustomerName from Customers
  Where City='London'

  - find the phone number for a particular supplier (provide id, or supplier name).
  Select Phone from Suppliers
  Where SupplierName='Exotic Liquid'

  - find all customers in a particular postal code.
  Select CustomerName from Customers
  Where PostalCode='05023'

  - find all suppliers who have names with more than 20 characters.
  Select SupplierName from Suppliers
  Where Length(SupplierName) > 20

  - list customers descending by the number of orders.
  Select count(OrderID), CustomerID from Orders
  Group by CustomerID

  - list orders descending by the order date.
  Select OrderId, OrderDate from Orders
  Order By OrderDate desc

  - list orders grouped by customer showing the number of orders per customer.
  Select Count(OrderID),CustomerID from Orders
  Group by CustomerID 
  Order by Count(OrderID) desc


  - list orders grouped by customer's city showing number of orders per city.
  

  - add a customer using your information.
   INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country) 
   VALUES ('Amazing Panda Moves', 'Randy Calderon', '2329 Coconut Ave', 'Valley Village', '91708', 'USA')

  - add 2 products.
  INSERT INTO PRODUCTS (ProductName, SupplierID, CategoryID, Unit, Price)
  VALUES ('Le Killer Frogs','203','230','10 boxes of kill','20000')

  INSERT INTO PRODUCTS (ProductName, SupplierID, CategoryID, Unit, Price)
  VALUES ('Le Killer Rhino','2000','2929939','10 spaceships of Rhino','2999999')

  - add 2 orders with you as the customer.
  Insert into Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
  Values (320300, 329, 2082-08-01, 100000)

  Insert into Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
  Values (3231300, 32911, 2123-03-22, 100000000)

  - delete all users that have no orders.