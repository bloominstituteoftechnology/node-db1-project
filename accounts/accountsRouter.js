const express = require('express');
const { where } = require('../data/dbConfig');
// database access using knex
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
    // get list of accounts from database
    // SELECT * FROM db
    db.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            handleError(error, res)
        });
    // return the list of accounts
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    // select * from accounts where id=1
    db.select('*')
        .from('accounts')
        //.where("id", "=", id)
        //.where("id", id)
        //.where({ id: id })
        .where({ id })
        .first() //same as grabbing the first element from the array manually with accounts[0]
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            handleError(error, res)
        });
});

router.post('/', (req, res) => {
    const accountData = req.body

    db('accounts')
        .insert(accountData, "id")
        .then(ids => {
            db('accounts')
                .where({ id: ids[0] })
                .first()
                .then(accounts => {
                    res.status(200).json({ data: accounts });
                })

        })
        .catch(error => {
            handleError(error, res)
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('accounts')
        .where({ id })
        .update(changes)
        .then(count => { // count is number of records updated
            if(count > 0) {
               res.status(200).json({ data: count }); 
            } else {
                res.status(404).json({ message: "There is no record to update" })
            }
        })
        .catch(error => {
            handleError(error, res)
        });
});



router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where({ id })
        .del()
        .then(count => { // count is number of records deleted
            if(count > 0) {
               res.status(200).json({ data: count }); 
            } else {
                res.status(404).json({ message: "There is no record to delete" })
            }
        })
        .catch(error => {
            handleError(error, res)
        });
});

function handleError(error, res) {
    console.log("error", error)
    res.status(500).json({ message: error.message });
}

module.exports = router;