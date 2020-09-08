//* Pull in express and the db object *// 
const express = require("express"); 
const db = require("../data/dbConfig"); 
const { reset } = require("nodemon");


//* Create Router *// 
const router = express.Router(); 

//! GET all !//
router.get("/", (req, res) => {
    db.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(err => {
            res.status(500).json({ message: "Could not get accounts "})
        });
}); 

//! GET by ID !// 
router.get("/:id", (req, res) => {
    //* we need to 'grab' the id from the req.params *// 
    const { id } = req.params; 
    //? Q: I have used the SELECT keyword to select all the records, and from there filter to find the ID with the WHERE keyword. FIRST returns the FIRST record that matches the criteria? ?// 
    db.select('*')
        .from('accounts')
        .where({ id })
        .first()
        .then(account => {
            res.status(200).json({ data: account })
        })
        .catch(err => {
            res.status(404).json({ message: "Account with this ID could not be found" })
        });
}); 

//! PUT (update) an account !// 
//* For a put request we know that we need the ID to match the right record, and the changes that we desire to make. So we will grab the id from the req.params and the changes from the req.body *// 
//* in the select statement we will select all accounts and UPDATE (passing in the changes) WHERE the ID matches the ID coming in on req.params *// 
router.put("/:id", (req, res) => {
    const { id } = req.params; 
    const changes = req.body; 

    db.select('*')
        .from('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            if(count > 0){
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ message: "There was no record matching this ID to update"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Unable to update account" })
        });
}); 

//! POST a new account !//
//* for a put request we know that we need to grab and pass a object containing the new account (named newAccount), that will be found in the req.body *// 
//* SQL insert - .insert(data, [returning]) <-- if returning array is passed it resolves with an array of all the added rows with specified columns. 'It's a shortcut for the returning method'
//? Q: What does the above comment MEAN? What exactly am I doing in the .then? ?// 
router.post("/", (req, res) => {
    const newAccount = req.body; 
    db('accounts')
        .insert(newAccount, 'id')
        .then(ids => {
            db('accounts')
                .where({ id:ids[0] })
                .first()
                .then(account => {
                    res.status(200).json({ data: account })
                })
                .catch(err => {
                    res.status(500).json({ message:"Could not post new account" })
                });
        });
});

//! DELETE an account 
//* For a delete request we know we need an ID to check against! We will grab that from req.params! *// 
//? Is the count thing apart of SQL, or knex? and we use it to see if something was in fact deleted? ?// 
router.delete("/:id", (req, res) => {
    const { id } = req.params; 
    db.select('*')
        .from('accounts')
        .where({ id })
        .del()
        .then(count => {
            if(count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ message: "No account with this ID could be found or removed" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Record could not be deleted" })
        });
}); 

//* export the router *// 
module.exports = router; 