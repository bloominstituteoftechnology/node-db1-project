const express = require("express");
const db = require("../data/dbConfig")

const router = express.Router();

//get 
router.get("/", (req, res) => {
    db("accounts")
        .then(accounts => {
            res.status(200).json({ data: accounts } );
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Could not retrive accounts." })
        })
})

//get:id
router.get("/:id", (req, res) => {
    const id = req.params;

    db.select("*").from("accounts").where(id)
    .first()
    .then(account => {
        res.status(200).json({ data: account })
    })
    .catch(error => {
        res.status(404).json({ message: "The account could not be found." })
    })
})


//post
router.post("/:id", (req, res) => {
    const newAccount = req.body;

    db("accounts").insert(newAccount, "id")
        .then(id => {
            db("accounts").where(id)
            .first()
            .then(account => {
                res.status(200).json({ data: account })
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "Could not post new account." })
        })
})

//delete
router.delete("/:id", (req, res) => {
    const id = req.params;

    db.select("*").from("accounts").where(id)
        .del()
        .then(count => {
            if(count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ errorMessage: "Could not find account." })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "Could not delete account" })
        })
})

//put
router.put("/:id", (req, res) => {
    const id = req.params;
    const changes = req.body;

    db.select("*").from("accounts").where(id)
    .update(changes)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ errorMessage: "Could not find account" })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message : "Could not update account" })
        })
})

//middleware
function validateAccount (req, res, next) {
    if(!req.body.name || !req.body.budget) {
        next();
    } else {
        res.status(404).json({ message: "Could not find account." })
    }
}

module.exports = router;