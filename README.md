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

    `select * from Customers where CustomerName like 'Alfreds%`    

  - find all customers that live in London.

    `select * from Customers where City='London'`

  - find the phone number for a particular supplier (provide id, or supplier name).

    `select Phone from Suppliers where SupplierID=3`

  - find all customers in a particular postal code.

    `select * from Customers where PostalCode='68306'`

  - find all suppliers who have names with more than 20 characters.

    `select * from Suppliers where length(SupplierName) > 20`

  - list customers descending by the number of orders.
  - list orders descending by the order date.

    `select * from Orders order by OrderDate desc`

  - list orders grouped by customer showing the number of orders per customer.
  - list orders grouped by customer's city showing number of orders per city.
  - add a customer using your information.

    `insert into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
     values ('Allen LLC', 'Allen Hai', '12345 Street Way', 'Houston', '23245', 'USA')`

  - add 2 products.
  - add 2 orders with you as the customer.
  - delete all users that have no orders.

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
