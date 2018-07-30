  - find all customers with a particular first name.
  select * from Customers where CustomerName = 'Alred';
  - find all customers that live in London.
  select * from Customers where City = 'London';
  - find the phone number for a particular supplier (provide id, or supplier name).
  select Phone from Suppliers where SupplierID = 'Exotic Liquid' or SupplierID = '1';
  - find all customers in a particular postal code.
  select * from Customers where PostalCode = '12209';
  - find all suppliers who have names with more than 20 characters.
  SELECT SupplierName FROM [Suppliers] where Length(SupplierName) > 20;
  - list customers descending by the number of orders.
  select customerID, count(*) from Orders group by customerid order by count (*) desc;
  - list orders descending by the order date.
  SELECT * FROM [Orders] order by OrderDate DESC;
  - list orders grouped by customer showing the number of orders per customer.
  SELECT COUNT(OrderID), CustomerID
FROM Orders
GROUP BY CustomerID
ORDER BY COUNT(OrderID) DESC;
  - list orders grouped by customer's city showing number of orders per city.
  SELECT COUNT(OrderID), City
FROM Customers, OrderDetails
GROUP BY City
ORDER BY COUNT(OrderID) DESC;
  - add a customer using your information.
  INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ('Joe','Joseph Stanfield','107 South Colonial Heights','Georgetown','40324','USA');
  - add 2 products.
  INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
VALUES ('Ipad','Apple','99','10 crates','499.99.');
  - add 2 orders with you as the customer.
  INSERT INTO Orders (CustomerID, EmployeeID, OrderDate, ShipperID)
VALUES ('92','6','1996-07-04','3');
  - delete all users that have no orders.
  DELETE * 
FROM Customers, OrderDetails 
WHERE Quantity = '0';
