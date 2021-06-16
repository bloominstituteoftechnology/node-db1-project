## Diff between SQL and noSQL

- noSQL can handle more than SQL
- MongoDB uses noSQL databases

- foreign keys are primary keys in other tables

## SQL select all

select \* from shippers

select @ from orders

## select columns and give it an alias from table

select shipperID ID, shippername Name, phone Phone from shippers

select columnName aliasname from shippers

## select with the shipper id of 1

select \* shippers where shipperid = 1

## select the ones where the shippername starts with anything and ends with express

select \* shippers where shippername like "%Express"

## select using a parameter, or statement

select \* shippers where shipper id < 2 or shipperid >3

## select where shipper id is less than 3 shippername starts with speedy and followed by anything

select \* shippers where shipperid < 3 and shippername like "Speedy%"

## select all from orders, give alias ord

select \* from orders ord

## more refined selection

- https://www.w3schools.com/sql/sql_join.asp
  select orderid, shippername from orders ord
  join shippers ship
  on ord.shipperId = ship.shipperId
  > on the condition that shipperId = shipperId
  > that is why we have aliases, to differentiate between the two columns

> you have to join the table where they have a common column

## lets combine orders and customers

select orderid, customer name from orders ord
join customers cust
on ord.customerid = cust.customerid

> the left table in this join is orders because it was the first table selected in the query
> left is first
> right is second

## order by

> desc (sort order large to small)
> limit 5 (show only top 5)
> select \* from products order by price desc limit 5

## group by

select \* from products group by categoryid

> it shows the first item with a categoryid of one and displays it
> group by helps use use SQL methods, start to count things and average things

## count... using SQL methods

select categoryid, count(cetegoryid) Total
from products group by categoryid

> it tells us how many items are in each category

## count... using SQL methods

select
categoryid,
count(categoryid) Total,
avg(price) "Average price"
from products
group by categoryid
order by "Average Price"

> it tells us how many items are in each category
> aliases can be more than one word, just put it in quotes
> order by "Average Price", shows cheapest first then goes higher

## join another table together so we can see the product name

select
prod.categoryid,
cat.categoryname,
count(prod.categoryid) Total,
avg(price) "Average price"
from products
join categorites cat
on prod.categoryid = cat.categoryid
where cat.categoryname not liek "%meat"

> takes out anything where meat is in the name"
> group by prod.categoryid
> order by "Average Price"
> join so we have product name

## CODE FROM CLASS - CRUD

--delete from shippers where shipperid = 5
--update shippers set phone = "(098)765 - 4321" where shipperid = 5
--insert into shippers (shippername)
--values ("Ye Olde Shipping Company the 2nd")
select _ from shippers
/_
select
prod.categoryid,
cat.categoryname,
count(prod.categoryid) Total,
avg(price) "Average Price"
from products prod
join categories cat
on prod.categoryid = cat.categoryid
where cat.categoryname not like "%meat%"
group by prod.categoryid
order by "Average Price"
*/
/*select orderid, customername from orders ord
join customers cust
on ord.customerid = cust.customerid*/
/*
select orderid, shippername from orders ord
join shippers ship
on ord.shipperid = ship.shipperid
_/
--select _ from shippers where shipperid < 3 and shippername like "Speedy%"
--select _ from shippers where shipperid < 2 or shipperid > 3
--select _ from shippers where shippername like "%Express"
--select \* from shippers where shipperid = 1
--select shipperID ID, shippername Name, phone Phone from shippers

## KNEX

http://knexjs.org/
