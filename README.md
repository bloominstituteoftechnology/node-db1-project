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

  ```sql
  select * from Customers where ContactName like 'maria%'
  ```

  - find all customers that live in London.

  ```sql
  select * from Customers where City='London'
  ```

  - find the phone number for a particular supplier (provide id, or supplier name).

  ```sql 
  select Phone from Suppliers where SupplierId 1
  ```

  ```sql 
  select Phone from Suppliers where SupplierName='Exotic Liquid'
  ```

  - find all customers in a particular postal code.

  ```sql
  select * from Customers where PostalCode=1010
  ```

  - find all suppliers who have names with more than 20 characters.

  ```sql
  select * from Suppliers where LENGTH(SupplierName) > 20
  ```

  - list customers descending by the number of orders.

  ```sql
  ```

  - list orders descending by the order date.

  ```sql
  select * from Orders order by OrderDate desc
  ```

  - list orders grouped by customer showing the number of orders per customer.

  ```sql
  ```

  - list orders grouped by customer's city showing number of orders per city.

  ```sql
  ```

  - add a customer using your information.

  ```sql
  insert into Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
  values ('Cesar Mejia','Cesar Mejia','5555 Steet Avenue','City Name','90270','USA')
  ```

  - add 2 products.

  ```sql
    insert into Products (ProductName, Unit, Price)
    values ('Chia Pet', '1 dozen', 10.99)
  ```

  ```sql
    insert into Products (ProductName, Unit, Price)
    values ('Pet Rock', '1 item', 20.99)
  ```

  - add 2 orders with you as the customer.

  ```sql
    insert into Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
    values (92, 1, '1981-10-06', 1)
  ```

  ```sql
    insert into Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
    values (92, 2, '1981-10-08', 2)
  ```
  
  - delete all users that have no orders.

  ```sql
  ```

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
