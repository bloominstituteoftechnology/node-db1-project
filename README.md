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
  1. find all customers with a particular first name.

  * SELECT * FROM Customers WHERE ContactName LIKE ('Ana%')

  2. find all customers that live in London.

  * SELECT * FROM Customers WHERE City='London';
  SELECT * FROM Customers WHERE City=(SELECT * FROM Customers WHERE City IN ('London'))

  3. find the phone number for a particular supplier (provide id, or supplier name).

  * SELECT phone FROM Suppliers WHERE SupplierName='Tokyo Traders';

  4. find all customers in a particular postal code.

  *  SELECT * FROM Customers WHERE PostalCode='WA1 1DP';


  5. find all suppliers who have names with more than 20 characters.

  *  SELECT SupplierName FROM Suppliers WHERE length(SupplierName) > 20

  6. list customers descending by the number of orders.

  * SELECT CustomerID, COUNT(CustomerID) AS num_of_orders FROM orders GROUP BY customerid ORDER BY num_of_orders DESC

  7. list orders descending by the order date.

  * SELECT * FROM Orders ORDER BY OrderDate 
  
  /// Oldest to newest or newest to oldest ? if oldest ? DES : null

  8. list orders grouped by customer showing the number of orders per customer.

  * SELECT *, COUNT(CustomerID) AS num_of_orders FROM orders GROUP BY customerid ORDER BY num_of_orders DESC

  9. list orders grouped by customer's city showing number of orders per city.

  10. add a customer using your information.

  * INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)

  VALUES ('hellboy','Luis Martinez','1120 Alhambra Rd','Alhambra','90270','USA');

  11. add 2 products.

  * INSERT INTO Products (ProductName, Price) VALUES ('MacWoods', 7.99), ('Raws', 5.99);

  12. add 2 orders with you as the customer.

  * INSERT INTO Orders (CustomerID, OrderDate) VALUES (94, '07-30-2018'), (94, '07-29-2018')

  13. delete all users that have no orders.

Clicking the `Restore Database` in that page will repopulate the database with the original data and discard all changes you have made.
