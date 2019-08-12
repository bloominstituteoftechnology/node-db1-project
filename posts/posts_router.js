const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .where()
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json({ message: 'error getting the posts!' })
        })
})

router.post('/', (req, res) => {
    const account = req.body;
    db('accounts')
        .insert(account, 'id')
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            res.status(500).json({ message: 'error saving the accounts to the db' });
        });
});



module.exports = router;