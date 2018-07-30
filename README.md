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
  - account `name` cannot is required.

### Write Basic Queries

- Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top) and write the following queries:
  - find all customers with a particular first name.
    SELECT * 
    FROM Customers
    WHERE CustomerName
    LIKE "A%";
  - find all customers that live in London.
    SELECT * 
    FROM Customers
    WHERE City = "London";
  - find the phone number for a particular supplier (provide id, or supplier name).\
    SELECT Phone 
    FROM Suppliers
    WHERE SupplierName = "Grandma Kelly's Homestead";
  - find all customers in a particular postal code.
    SELECT * 
    FROM Customers
    WHERE PostalCode = "28023";
  - find all suppliers who have names with more than 20 characters.
    SELECT * 
    FROM Suppliers
    WHERE Length(SupplierName) > 20;
  - list customers descending by the number of orders.
    SELECT customerID, count(*)
    FROM Orders
    group by customerID
    order by count(*) desc
  - list orders descending by the order date.
    SELECT *
    FROM Orders
    ORDER BY OrderDate desc;
  - list orders grouped by customer showing the number of orders per customer.
    SELECT count(OrderID), CustomerID
    FROM Orders
    GROUP BY CustomerID
    ORDER BY count(OrderID) desc;
  - list orders grouped by customer's city showing number of orders per city.
  ** PENDING **
    SELECT count(OrderID), City
    FROM Customers, OrderDetails
    GROUP BY City
    ORDER BY count(OrderID) desc;
  - add a customer using your information.
    INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
    VALUES ('Jake Southworth', 'Jameson Brown', '123 Main Street', 'Springville', '84663', 'USA')
  - add 2 products.
    INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
    VALUES ('Coconut Macaroons', '2', '7', '10 boxes of 20', '30')
  - add 2 orders with you as the customer.
    INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
    VALUES ('92', '8', '2018-07-30', '2')
  - delete all users that have no orders.
  ** PENDING **

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
