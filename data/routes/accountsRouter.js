const express = require('express');

//Import Data
const Accounts = require('../dbConfig');

const router = express.Router()

router.get('/', (req, res) => {
    Accounts.select('*')
        .from('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log("error with GET /accounts/", err);
            res.status(500).json({error: "There was an error fetching requested accounts."})
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    Accounts('accounts')
        .where({id})
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            console.log("error with GET /accounts/:id", err);
            res.status(404).json({error: "That account doesn't exist."})
        })
    });


router.post('/', (req, res) => {
    const AccountData = req.body;

    Accounts('accounts')
        .insert(AccountData, 'id')
        .then(([id]) => {
            Accounts('accounts')
            .where({id})
            .first()
            .then(account => {
                res.status(201).json(account)
            })
            .catch(err => {
                console.log("error with POST /accounts/", err);
                res.status(500).json({error: "There was a problem adding new account."})
            });
        });
});
module.exports = router;