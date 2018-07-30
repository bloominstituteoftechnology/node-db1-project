### Write Basic Queries

- Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top) and write the following queries:
  - find all customers with a particular first name.
    SELECT * FROM [Customers]
    WHERE CustomerName LIKE'A%'

  - find all customers that live in London.
    SELECT * FROM [Customers]
    WHERE City = 'London'

  - find the phone number for a particular supplier (provide id, or supplier name).
    SELECT Phone, SupplierName FROM [Suppliers]
    WHERE SupplierName = 'Pavlova, Ltd.'

  - find all customers in a particular postal code.
    SELECT * FROM [Customers]
    WHERE PostalCode = 41101

  - find all suppliers who have names with more than 20 characters.
    SELECT * FROM [Suppliers]
    WHERE LENGTH(SupplierName) >= 20

  - list customers descending by the number of orders.
    SELECT cm.CustomerName, cm.CustomerID, od.Quantity 
    FROM Customers cm
    JOIN Orders os ON os.CustomerID = cm.CustomerID
    JOIN OrderDetails od ON os.OrderID = od.OrderID
    ORDER BY Quantity DESC

  - list orders descending by the order date.
    SELECT * FROM [Orders]
    ORDER BY OrderDate DESC

  - list orders grouped by customer showing the number of orders per customer.
    SELECT cm.CustomerName, cm.CustomerID, od.Quantity 
    FROM Customers cm
    JOIN Orders os ON os.CustomerID = cm.CustomerID
    JOIN OrderDetails od ON os.OrderID = od.OrderID
    GROUP BY os.CustomerID
    ORDER BY Quantity DESC

  - list orders grouped by customer's city showing number of orders per city.
    SELECT cm.CustomerName, cm.City, cm.CustomerID, od.Quantity 
    FROM Customers cm
    JOIN Orders os ON os.CustomerID = cm.CustomerID
    JOIN OrderDetails od ON os.OrderID = od.OrderID
    GROUP BY cm.City
    ORDER BY Quantity DESC

  - add a customer using your information.
    INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
    VALUES ('Van Gogh', 'Van G', 'Museumplein 6, 1071 DJ', ' Amsterdam', '75366', 'Netherlands');

  - add 2 products.
    INSERT INTO Products (ProductName, SupplierID, CategoryID, Unit, Price)
    VALUES ('Paintings', 91, 55, '30 x 40 oil on birch wood cradled panel', 5399.99),
    ('Sculptures', 91, 59, '29 H X 18 W X 3.5 D', 3099.99)

  - add 2 orders with you as the customer.
    INSERT INTO orders VALUES(10235, 95, 4, '2018-07-30',	56),
    (10236, 95, 10, '2018-07-30',	6)

  - delete all users that have no orders.
    DELETE FROM Customers
    WHERE CustomerID
    NOT IN (SELECT CustomerID FROM Orders)