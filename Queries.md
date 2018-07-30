* create _accounts_ table
```
CREATE TABLE accounts (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL UNIQUE,
	budget REAL
)
```

* create _index_ for name
```
CREATE INDEX idx_accounts_name on accounts (name)
```

* find all customers with a particular first name.
```
SELECT * 
FROM customers
WHERE customername like 'Consolidated %'
```

* find all customers that live in London.
```
SELECT *
FROM customers
WHERE city = 'London'
```

* find the phone number for a particular supplier (provide id, or supplier name).
```
SELECT phone
FROM suppliers
WHERE suppliername = 'Tokyo Traders'
```

* find all customers in a particular postal code.
```
SELECT *
FROM customers
WHERE postalcode = '12209'
```

* find all suppliers who have names with more than 20 characters.
```
SELECT * 
FROM suppliers
WHERE LENGTH(suppliername) > 20
```

* list customers descending by the number of orders.
```
SELECT customername, customerid, count(orderid) order_cnt 
FROM customers c INNER JOIN orders o ON c.customerid = o.customerid
GROUP BY customerid 
ORDER BY order_cnt desc
```

* list orders descending by the order date.
```
SELECT * 
FROM orders
ORDER BY orderdate DESC
```

* list orders grouped by customer showing the number of orders per customer.
```
SELECT customername, o.customerid, count(orderid) order_cnt 
FROM customers c INNER JOIN orders o ON c.customerid = o.customerid
GROUP BY o.customerid 
```

* list orders grouped by customer's city showing number of orders per city.
```
SELECT city, count(orderid) order_cnt 
FROM customers c INNER JOIN orders o ON c.customerid = o.customerid
GROUP BY c.customerid 
ORDER BY city asc
```

* add a customer using your information.
```
INSERT INTO customers VALUES(92, 'Vu Cao', 'Vu Cao', '123 abcd', 'Fullerton', '92832', 'USA')
```

* add 2 products.
```
INSERT INTO products VALUES(78, 'Voss Water', 12, 4, '12 - 500ml bottles', 36)
INSERT INTO products VALUES(79, 'Fiji Water', 11, 3, '12 - 500ml bottles', 50)
```

* add 2 orders with you as the customer.
```
INSERT INTO orders VALUES(10444, 91, 8, '2018-07-30',	1)
INSERT INTO orders VALUES(10445, 50, 7, '2018-07-30',	2)
```

* delete all users that have no orders.
```
DELETE customers
WHERE customerid not in (SELECT DISTINCT customerid FROM orders)
```