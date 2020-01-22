const express = require("express");
const knex = require("knex");


const knexConfiguration = {
    // client answers: which type (sqlite, postgres, mysql, oracle) of database?
    client: "sqlite3", // the db driver
    // the rest will depend on the type of database
    // connection could be a string or an object
    connection: {
        filename: "./data/budget.db3",
    },
    useNullAsDefault: true, // ONLY needed for SQLite
};

// db represents a connection to the database
const db = knex(knexConfiguration);

const router = express.Router();


router.get("/accounts", (req, res) => {
    db("accounts")
        .then(hubs => {
            res.json(hubs);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve Data" });
        });
});


router.post("/accounts", (req, res) => {
    
    const payload = {
        name: req.body.name,
        budget: req.body.budget
    }
    console.log(payload)
    db("accounts")
        .insert(payload) // with SQLite, by default it returns an array with the last id
        .then(ids => {
            db("accounts")
                .where({ id: ids[0] })
                .then(newData => {
                    res.status(201).json(newData);
                });
        })
        .catch(err => {
            console.log("POST error", err);
            res.status(500).json({ message: "Error Error" });
        });
});

router.put("/accounts/:id", (req, res) => {
    const id = req.params
    const payload = {
        name: req.body.name,
        budget: req.body.budget
    }
    console.log(payload, id)

    db("accounts")
    .where({id})
        .update(payload) // with SQLite, by default it returns an array with the last id
        .then(hubs => {
            res.json(hubs)
        })
        .catch(err => {
            console.log("POST error", err);
            res.status(500).json({ message: "Error Error" });
        });
});


router.delete("/accounts/:id", (req, res) => {
    const {id}  = req.params;
    db("accounts")
    .where({ id })
    .del()
        .then(hubs => {
            res.json({removed: hubs});
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to delete Data" });
        });
});


module.exports = router;