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
    - `SELECT * FROM customers WHERE contactname LIKE 'Maria %'`
  - find all customers that live in London.
    - `SELECT * FROM customers WHERE city IS 'London'`
  - find the phone number for a particular supplier (provide id, or supplier name).
    - `SELECT suppliername FROM suppliers WHERE phone IS '(11) 555 4640'`
  - find all customers in a particular postal code.
    - `SELECT * FROM customers WHERE postalcode IS '78000'`
  - find all suppliers who have names with more than 20 characters.
    - `SELECT * FROM suppliers WHERE LENGTH("suppliername") > 20`
  - list customers descending by the number of orders.
    - `SELECT customerid, COUNT("customerid") as "# of orders" FROM orders GROUP BY customerid ORDER BY COUNT("customerid") DESC`
  - list orders descending by the order date.
    - `SELECT * FROM orders ORDER BY orderdate DESC`
  - list orders grouped by customer showing the number of orders per customer.
    - `SELECT orderid, COUNT("orderid") as "# of orders" FROM orders GROUP BY orderid`
  - list orders grouped by customer's city showing number of orders per city.
    - `SELECT city, COUNT("city") FROM customers WHERE customerid IN (SELECT customerid FROM orders) GROUP BY city`
  - add a customer using your information.
    - `INSERT INTO customers (customername, contactname, address, city, postalcode, country) VALUES ("Hackers Anonymous", "Thomas Greenhalgh", "Oceanside Way", "Santa Monica", 90405, "USA");`
  - add 2 products.
    - `INSERT INTO products (productname, supplierid, categoryid, unit, price VALUES ("Hacking Machine", 1, 1, "1 machine", 937.67), ("Universal Hacker", 2, 7, "1 machine", 1232.97)`
  - add 2 orders with you as the customer.
    - `INSERT INTO orders (customerid, employeeid, orderdate, shipperid) VALUES (92, 5, "2018-07-30", 2), (92, 3, "2018-07-30", 1)`
  - delete all users that have no orders.
    - `DELETE FROM Customers WHERE customerid NOT IN (SELECT customerid FROM orders)`

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
