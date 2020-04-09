const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .then(data => {
            res.status(200).json({ accounts: data });
        })
        .catch(error => {
            res.status(500).json({ message: "Error getting accounts" });
        });
});

router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            if (account) {
                res.status(200).json(account)
            } else {
                res.status(404).json({ message: "Cannot find an account with that ID" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error finding account" });
        });
});

router.post('/', (req, res) => {
    db('accounts')
        .insert(req.body, "id")
        .then(id => {
            res.status(201).json({ id: id, newAccount: req.body });
        })
        .catch(error => {
            res.status(500).json({ message: "Error adding account" });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;

    db('accounts')
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Account has been updated" });
            } else {
                res.status(404).json({ message: "Could not find that accound ID" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error updating account" });
        });
});

router.delete('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Account has been successfully deleted" });
            } else {
                res.status(404).json({ message: "Could not find an account with that ID" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error deleting account" });
        })
})

module.exports = router;