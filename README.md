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
    SELECT * 
    FROM Customers
    WHERE CustomerName LIKE 'Alfreds%'


  - find all customers that live in London.
    SELECT * 
    FROM Customers
    WHERE City LIKE 'Berlin'

  - find the phone number for a particular supplier (provide id, or supplier name).
    SELECT Phone, SupplierName 
    FROM Suppliers
    WHERE SupplierName LIKE 'Exotic Liquid' or SupplierID LIKE 1

  - find all customers in a particular postal code.
    SELECT * 
    FROM Customers
    WHERE PostalCode = "05021"

  - find all suppliers who have names with more than 20 characters.
    SELECT * 
    FROM suppliers
    WHERE LENGTH(SupplierName) > 20

  - list customers descending by the number of orders.
    SELECT COUNT(Orders.CustomerID) AS NumberofOrders, Orders.CustomerID, Customers.CustomerName
    FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    GROUP BY Orders.CustomerID
    ORDER BY NumberOfOrders desc

  - list orders descending by the order date.
    SELECT *
    FROM Orders
    ORDER BY OrderDate desc

  - list orders grouped by customer showing the number of orders per customer.
    SELECT Orders.CustomerID, Customers.CustomerName, Customers.CustomerID, COUNT(Customers.CustomerID) AS Number_Of_Purchases
    FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    GROUP BY Customers.CustomerID
    ORDER BY COUNT(Customers.CustomerID) desc

  - list orders grouped by customer's city showing number of orders per city.
    SELECT COUNT(Customers.City), Customers.city
    FROM Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
    GROUP BY Customers.City
    ORDER BY Count(Customers.city) desc

  - add a customer using your information.
  - add 2 products.
  - add 2 orders with you as the customer.
  - delete all users that have no orders.

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
