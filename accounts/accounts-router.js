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

module.exports = router;

