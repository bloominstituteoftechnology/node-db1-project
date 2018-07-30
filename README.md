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
## find all customers with a particular first name.

    select * from customers where CustomerName like "Alfreds %"

## find all customers that live in London.

    select * from customers where country = "London"

## find the phone number for a particular supplier (provide id, or supplier name).

    select phone from suppliers where SupplierName = "Tokyo Traders"

## find all customers in a particular postal code.

    select * from customers where PostalCode = 68306

## find all suppliers who have names with more than 20 characters.

    select * from suppliers where Length(supplierName) > 20

## list customers descending by the number of orders.
    select *, count(customerID) as NumberOfOrders
    from orders
    group by customerID
    order by NumberOfOrders desc

## list orders descending by the order date.
    SELECT * FROM [Orders] order by OrderDate desc

## list orders grouped by customer showing the number of orders per customer.
    select *, count(customerID) as NumberOfOrders
    from orders
    group by customerID

## list orders grouped by customer's city showing number of orders per city.

## add a customer using your information.
    
    INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
    VALUES ('Simon','Simon Kirk Davis','2049 Dragon Avenue','Atlanta','2502','USA');

## add 2 products.

    Insert into Products (ProductName, SupplierID, CategoryID, Unit, Price)
    Values ("Seaweed", 1, 1, "24 oz", 94)

    Insert into Products (ProductName, SupplierID, CategoryID, Unit, Price)
    Values ("Dog Food", 3, 2, "1 kg pkg.", 1200)

## add 2 orders with you as the customer.

    Insert into Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
    Values (120, 3, "2018-07-28", 3)
    
    Insert into Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
    Values (120, 3, "2018-07-28", 1)

## delete all users that have no orders.


Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
