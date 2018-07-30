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
    > SELECT \* FROM customers WHERE customername = 'name'
  - find all customers that live in London.
    > SELECT \* FROM customers WHERE city = 'London'
  - find the phone number for a particular supplier (provide id, or supplier name).
    > SELECT phone FROM suppliers WHERE supplierid = '1'
  - find all customers in a particular postal code.
    > SELECT \* FROM customers WHERE postalcode = '12209'
  - find all suppliers who have names with more than 20 characters.
    > SELECT \* FROM suppliers WHERE LENGTH(suppliername) > 20;
  - list customers descending by the number of orders.
    > SELECT customername FROM customers ORDER BY customerid DESC
  - list orders descending by the order date.
    > SELECT \* FROM orders ORDER BY orderdate DESC
  - list orders grouped by customer showing the number of orders per customer.
    > SELECT customerid, count(customerid) FROM orders group by (customerid)
  - list orders grouped by customer's city showing number of orders per city.

  - add a customer using your information.
    > INSERT INTO customers (CustomerName, ContactName, Address, City, PostalCode, Country) VALUES('Logan Wright', 'Logan', '1234 Some st', 'SomeCity', '88001', 'USA')
  - add 2 products.
    > INSERT INTO products (ProductName, SupplierId, CategoryId, Unit, Price)
    > VALUES ('drugs', 1, 1, '100 lbs of assorted drugs, marked by the fbi', 10000)

  > INSERT INTO products (ProductName, SupplierId, CategoryId, Unit, Price)
  > VALUES ('toilet paper', 4, 2, 'one million rolls of toilet paper', 10000)

  - add 2 orders with you as the customer.
    > INSERT INTO orders (customerid, employeeid, orderdate, shipperid)
    > VALUES (92, 3, '2018-03-01', 2)
    > INSERT INTO orders (customerid, employeeid, orderdate, shipperid)
    > VALUES (92, 1, '2018-01-06', 3)
  - delete all users that have no orders.

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
