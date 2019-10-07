# Database Queries

## Find all customers with postal code 1010
```sql
SELECT * FROM customers
WHERE PostalCode='1010';```

## Find the phone number for the supplier with the id 11
```sql
SELECT * FROM [Suppliers]
where SupplierID='11';```

## List first 10 orders ever places, descending by the order date
```sql
SELECT * FROM [Orders]
order by OrderDate asc,
OrderDate desc
limit 10;```

## Find all customers that live in London, Madrid, or Brazil
```sql
SELECT * FROM [Customers]
where city in ('London', 'Madrid', 'Brazil')
```

## Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
```sql
INSERT into Customers('CustomerName', 'ContactName', 'Address', 'City', 'PostalCode', 'Country')
VALUES ('The Shire', 'Bilbo Baggins', '1 Hobbit-Hole', 'Bag End', '111', 'Middle Earth')
```

## Update Bilbo Baggins record so that the postal code changes to "11122"
```sql
UPDATE Customers
SET PostalCode='11122';
```
## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

- Since I did not get this question, I will do it multiple queries
```sql
SELECT COUNT(DISTINCT City)
FROM Customers
```
// count Cities 69

```sql
SELECT City, COUNT(*)
FROM Customers
GROUP BY City
HAVING COUNT(*) > 1
```
// return Cities by count column


## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
```sql
SELECT SupplierName FROM Suppliers
WHERE LENGTH(SupplierName) > 20;
```
// RETURNS 11