-- # Database Queries

-- 1. Find all customers with postal code 1010
SELECT *
FROM [Customers]
WHERE (
  [PostalCode] = 1010
)

-- 2. Find the phone number for the supplier with the id 11
SELECT [Phone]
FROM [Suppliers]
WHERE (
  [SupplierID] = 11
)

-- 3. List first 10 orders placed, sorted descending by the order date
SELECT *
FROM (
  -- earliest (first) 10 orders, [OrderDate] asc
  SELECT *
  FROM [Orders]
  ORDER BY [OrderDate] ASC
  LIMIT 10
)
ORDER BY [OrderDate] DESC -- now [OrderDate] desc

-- 4. Find all customers that live in London, Madrid, or Brazil
SELECT *
FROM [Customers]
WHERE (
  [City] IN ('London','Madrid')
  OR
  [Country] = 'Brazil'
)

-- 5. Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO [Customers] (
  [CustomerName],
  [ContactName],
  [Address],
  [City],
  [PostalCode],
  [Country]
) VALUES (
  'Bilbo Baggins',
  'Bilbo Baggins',
  '1 Hobbit-Hole',
  'Bag End',
  '111',
  'Middle Earth'
)

-- 6. Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE [Customers]
SET [PostalCode] = '11122'
WHERE (
  [CustomerName] = 'Bilbo Baggins'
)

-- 7. (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted.
SELECT COUNT (DISTINCT [City])
FROM [Customers]

-- 8. (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT *
FROM [Suppliers]
WHERE (
  LENGTH ([SupplierName]) > 20
)
