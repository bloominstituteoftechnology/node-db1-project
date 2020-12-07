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
    console.log(newAccount)
    Account.create(newAccount)
        .then(account => {
            res.status(201).json(account)
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Account.update(id, changes)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

router.delete('/:id', (req, res) => { 
    const { id } = req.params;
    Account.remove(id)
        .then(() => {
            res.status(204).json({ message: 'Account successfully deleted' })
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        })
})

module.exports = router;