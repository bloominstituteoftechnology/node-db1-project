// SELECT * FROM Customers
// where postalcode = 1010;

db('customers').where({ postalcode: 1010 });

// find the phone number for the supplier with the id 11. Should be (010) 9984510.

 SELECT * FROM Suppliers
 where supplierID = 11;

db('suppliers').where( { supplierID: 11 });

// list first 10 orders placed, sorted descending by the order date. The order with date 1997-02-12 should be at the top.

 SELECT * FROM Orders
 ORDER BY orderDate DESC;


db('orders').where( { orderDate: 'DESC' });

// find all customers that live in London, Madrid, or Brazil. Returns 18 records.

// SELECT * FROM Customers
// WHERE city = "London"
// OR city = "Brazil"
// OR city = "Madrid"

db('customers').where( { city = "London" } ).or( { city: "Brazil" } ).or( { city: "Madrid" } );



// add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is "1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth".

// INSERT INTO Customers (customername, contactname, address, city, postalcode, country)
// VALUES ("The Shire", "Bilbo Baggins", "1 Hobbit Hole", "Bag End", "111", "Middle Earth")

db('customers').insert({
    customername: "The Shire",
    contactname: "Bilbo Baggins",
    address: "1 Hobbit-Hole",
    city: "Bag End",
    postalcode: "111",
    country: "Middle Earth"
});


// update Bilbo Baggins record so that the postal code changes to "11122".

 UPDATE Customers SET Postalcode = '11122' 
 WHERE ContactName = 'Bilbo Baggins';