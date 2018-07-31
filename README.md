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
      ## SELECT * FROM [Customers] where CustomerName like 'La%';
  - find all customers that live in London.
      ## SELECT * FROM [Customers] where city = 'London' ;
  - find the phone number for a particular supplier (provide id, or supplier name).
      ## SELECT Phone FROM [Suppliers] where SupplierName = 'Bigfoot Breweries';
  - find all customers in a particular postal code.
      ## SELECT * FROM [Customers] where PostalCode = 75012;
  - find all suppliers who have names with more than 20 characters.
      ##SELECT * FROM [Suppliers] where length(SupplierName) > 20;
  - list customers descending by the number of orders.
      ## SELECT customerid, count(customerid) as "# of orders" FROM [Orders] group by customerid order by "# of orders" desc;
  - list orders descending by the order date.
      ## SELECT * FROM [Orders] order by orderdate desc;
  - list orders grouped by customer showing the number of orders per customer.
      ## SELECT customerid, count(customerid) as "# of orders", * FROM [Orders] group by customerid order by "# of orders";
  - list orders grouped by customer's city showing number of orders per city.

  - add a customer using your information.
    ## insert into [Customers] (customername, contactname, address, city, postalcode, country) values ("Aleczander Jordan", "Sonya Jordan", "114 Roundabout Way", "Manitoba", "123458", "Benin");
  - add 2 products.
      ## insert into [Products] (productname, supplierid, categoryid, unit, price) values ('iPhone', 1, 1, '24bags', 19), ('Air Guitar', 2, 2, '3 crates', 1000);
  - add 2 orders with you as the customer.
  ## insert into [Orders] (customerid, employeeid, orderdate, shipperid) values (92, 4, '2018-07-30', 3);
  ## insert into [Orders] (customerid, employeeid, orderdate, shipperid) values (92, 2, '2018-07-30', 2);
  - delete all users that have no orders.

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
