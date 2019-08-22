***find all customers with postal code 1010. Returns 3 records.***

select * from Customers
where PostalCode=1010
limit 3;

***find the phone number for the supplier with the id 11. Should be (010) 9984510.***

select Phone from Suppliers
where SupplierID=11

***list first 10 orders placed, sorted descending by the order date. The order with date 1997-02-12 should be at the top.***

select * from Orders
order by OrderDate desc
limit 10;

***find all customers that live in London, Madrid, or Brazil. Returns 17 record***

select * from Customers
where city in ('Paris', 'London')
or Country in ('Brazil')

***add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is "1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"***

`insert into` Customers(CustomerName, ContactName, Address, PostalCode, Country)
`values`('The Shire', "Bilbo Baggins", "1 Hobbit-Hole", 111,  "Middle Earth")

***update Bilbo Baggins record so that the postal code changes to "11122".***

update Customers 
set PostalCode=1122 
where CustomerName='The Shire'

## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
