const express = require('express')
const router = express.Router();
const accountHelper = require('./data/helpers/accountsModel');

router.get('/', (req, res) => {
    accountHelper
        .get()
        .then(accounts => res.status(200).json(accounts))
        .catch(err => res.status(500).json({ error: err }))
});

router.delete('/:id', (req, res) => {
    accountHelper
        .remove(req.params.id)
        .then(id => {
            res.status(200).json(id)
        })
        .catch(err => res.status(500).json({ error: err }))
});
