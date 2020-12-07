const express = require('express');
const router = express.Router();
const Account = require('./accounts-model');

router.get('/', (req, res) => {
    Account.getAll()
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Account.getById(id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

router.post('/', (req, res) => {
    const newAccount = req.body;
    Account.insert(newAccount)
        .then(account => {
            res.status(201).json(accounts)
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

router.put('/', (req, res) => {
    
})

router.delete('/', (req, res) => {
    
})

module.exports = router;