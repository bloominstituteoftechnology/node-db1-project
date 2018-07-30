# Assignments
## Create a Database Table
• use DB Browser for SQLite to create a database, name it anything you want.

• add an accounts table with the following schema:

    • id, numeric value with no decimal places that should autoincrement.
    • name, string, add whatever is necessary to make searching by name faster.
    • budget numeric value.

• constraints

    • the id should be the primary key for the table.
    • account name should be unique.
    • account name, required.

# Write Basic Queries
• Visit SQL Try Editor at W3Schools.com and write the following queries:

### find all customers with a particular first name.

SELECT ContactName FROM Customers
where ContactName like 'Elizabeth%'

### find all customers that live in London.

SELECT ContactName, * FROM Customers
where city = 'London'

### find the phone number for a particular supplier (provide id, or supplier name).

SELECT Phone, * FROM Suppliers
where SupplierID = '12'

SELECT Phone, * FROM Suppliers
where SupplierName like 'Aux%'


### find all customers in a particular postal code.

SELECT * FROM Customers
where PostalCode = '05033'
-- where PostalCode like '05033'

### find all suppliers who have names with more than 20 characters.

SELECT * FROM Customers
where length(CustomerName) > 20

### list customers descending by the number of orders.

SELECT Customers.CustomerName, Customers.CustomerID, COUNT(Orders.CustomerID) AS NumberOfOrders FROM Orders
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID
GROUP BY CustomerName
ORDER BY NumberOfOrders desc

### list orders descending by the order date.

SELECT * FROM [Orders]
order by OrderDate desc

### list orders grouped by customer showing the number of orders per customer.

SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID=Orders.CustomerID
ORDER BY Customers.CustomerName;

-- not sure how to get this to properly group without removing IDs

### list orders grouped by customer's city showing number of orders per city.
    • 

### add a customer using your information.

INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Studio MF','Mark Hong','Skagen 21','Stavanger','4006','Norway');

        
### add 2 products.
INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
VALUES ('Royal Syrup','1','2','12 - 550 ml bottles','12');

INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
VALUES ('Jammin Jelly','1','2','12 - 22 oz jars','18');

### add 2 orders with you as the customer.
    • 

### delete all users that have no orders.
    • 


Clicking the Restore Database in that page will repopulate the database with the original data and discard all changes you have made.