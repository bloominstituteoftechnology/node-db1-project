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

1 - find all customers with a particular first name.
Select \* From Customers
Where CustomerName like '{name}%`;

2 - find all customers that live in London.
Select \* From Customer
Where City = 'London';

3 - find the phone number for a particular supplier (provide id, or supplier name).
Select SupplierID, SupplierName, Phone From [Suppliers]
Where SupplierID = {SupplierID} or SupplierName like '%{SupplierName}%';

4 - find all customers in a particular postal code.
Select \* From [Customers]
Where PostalCode = {PostalCode};

5 - find all suppliers who have names with more than 20 characters.
Select \* From [Suppliers]
Where Length({SupplierName}) > 20;

6 - list customers descending by the number of orders.
Select CustomerID, count(CustomerID) From [Orders]
Group By CustomerId order by count(CustomerId) desc;

7 - list orders descending by the order date.
Select \* From [Orders]
Order by OrderDate Desc;

8 - list orders grouped by customer showing the number of orders per customer.
Select count(CustomerID), CustomerID From [Orders]
Group By CustomerId order by count(CustomerId)

- list orders grouped by customer's city showing number of orders per city.
  Select count(Orders.CustomerID), Customers.City
  From Orders
  Inner Join Customers
  On Orders.CustomerID = Customers.CustomerID
  Group By Customers.city order by count(Orders.CustomerID)

- add a customer using your information.
  Insert Into Customers (CustomerID, CustomerName, ContactName, Address, City, PostalCode, Country)
  Values ({CustomerID}, '{CustomerName}', '{ContactName}', '{Address}', '{City}', {PostalCode}, '{Country}')

- add 2 products.
  Insert Into Products (ProductID, ProductName, SupplierID, CategoryID, Unit, Price)
  Values ({ProductID}, '{ProductName}', {SupplierID}, {CategoryID}, '{Unit}', {Price})

- add 2 orders with you as the customer.
  add twice the following:
  Insert Into Orders (OrderID, CustomerID, EmployeeID, OrderDate, ShipperID)
  Values ({OrderID}, {CustomerID}, {EmployeeID}, {OrderDate}, {ShipperID})

- delete all users that have no orders.
  Delete From Customers
  Where CustomerID in(
  Select customers.CustomerID
  From Customers
  LEFT Join Orders
  On Customers.CustomerID = Orders.CustomerID
  where orderID is null)

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.

notes: -- comment
