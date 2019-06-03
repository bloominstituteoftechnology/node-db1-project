# SQL Exercises

## Topics

- Structured Query Language (SQL)
- Relational Databases
- SQLite
- Writing Basic Queries

## Assignment

For this lab you will:

- write SQL statements against a pre-populated database using an online tool. Once you have the correct SQL Statement for each query, write it inside the `queries.md` file under the appropriate heading.
- install [`SQLite Studio`](https://sqlitestudio.pl/index.rvt) and use it to create a database within this codebase.
- using `SQLite Studio` add a table to the database you just created.
- write API endpoints to interact with your database

### Write Basic Queries

Visit [SQL Try Editor at W3Schools.com](https://www.w3schools.com/Sql/tryit.asp?filename=trysql_select_top) using the **Google Chrome (or Chromium if you use Linux) browser** and write _SQL queries_ for the following requirements:

- find all customers that live in London. Returns 6 records.
- find all customers with postal code 1010. Returns 3 customers.
- find the phone number for the supplier with the id 11. Should be (010) 9984510.
- list orders descending by the order date. The order with date 1997-02-12 should be at the top.
- find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name. Returns 11 records.
- find all customers that include the word "market" in the name. Should return 4 records.

**Clicking the `Restore Database` button in the page will repopulate the database with the original data and discard all changes you have made**.

### Create Database and Table

- use [`SQLite Studio`](https://sqlitestudio.pl/index.rvt) to create a database, name it `budget.db3` and save it in the `data` folder of this repository. **You must use this exact name and save it within the `data` folder or your `accounts-model` will not be able to connect.**
- add an `accounts` table with the following _schema_:

  - `id`, numeric value with no decimal places that should autoincrement.
  - `name`, string, add whatever is necessary to make searching by name faster.
  - `budget` numeric value.

- constraints
  - the `id` should be the primary key for the table.
  - account `name` should be unique.
  - account `budget` is required.

#### Database Access

Database access will be done using the `accounts-model.js` file included inside the `data` folder. This file publishes the following methods:

**All these methods are asynchronous and return a promise**.

- `find()`: calling find returns a promise that resolves with an array of all the accounts contained in the database.
- `findById()`: this method expects an `id` as it's only parameter and returns a promise that resolves with the account corresponding to the `id` provided or a _falsy_ value if an account with that `id` is not found.
- `add()`: calling addd passing it a _account_ object will add it to the database and return a promise that resolves with the newly inserted _account_.
- `update()`: accepts two arguments, the first is the `id` of the account to update and the second is an object with the `changes` to apply. It returns a promise that resolves with the count of updated records. If the count is `1` it means the record was updated correctly.
- `remove()`: the remove method accepts an `id` as it's first parameter and upon successfully deleting the account from the database it returns returns a promise that resolves with the number of records deleted.

Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

### Write endpoints for the accounts resource

- Within `server.js` add CRUD endpoints for the account resource. You may use `data/accounts-model.js` for access to your newly created database. The methods included in the `accounts-model` are described above in the _Database Access_ section.
- Use these endpoints to manually test that your database is working as expected.

## Stretch Problems

The following exercises **require research**, the concepts needed to complete them have not been covered in class yet.

- add a customer record for _"The Shire"_, the contact name is _"Bilbo Baggins"_ the address is _"1 Hobbit-Hole"_ in _"Bag End"_, postal code _"111"_ and the country is _"Middle Earth"_.
- update _Bilbo Baggins_ record so that the postal code changes to _"11122"_.
- delete all customers that have no orders. Should delete 18 records.
- list orders grouped by customer showing the number of orders per customer. _Rattlesnake Canyon Grocery_ should have 7 orders.
- list customers names and the number of orders per customer. Sort the list by number of orders in descending order. _Ernst Handel_ should be at the top with 10 orders followed by _QUICK-Stop_, _Rattlesnake Canyon Grocery_ and _Wartian Herkku_ with 7 orders each.
- list orders grouped by customer's city showing number of orders per city. Returns 58 Records with _Aachen_ showing 2 orders and _Albuquerque_ showing 7 orders.
