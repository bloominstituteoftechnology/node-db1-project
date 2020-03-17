const router = require('express').Router();
const db = require('../data/dbConfig.js');

router.get('/', (req, res) => {
    db('accounts').then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'could not retrieve the accounts'});
    });
});

router.get('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .first().then(account => {
        if (account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({ error: "Account is not found" })
        }
    });
});