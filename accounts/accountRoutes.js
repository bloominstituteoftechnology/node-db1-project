const express = require('express');

const router = express.Router();

const db = require('./db');

router.get('/', (req, res) => {
    db.find()
        .then( accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    db.findById(id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const accountPost = req.body;

    db.insert(accountPost)
        .then( account => {
            res.status(200).json(account);
        })
        .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    db.remove(id)
        .then(del => {
            res.status(200).json(del);
        })
        .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const account = req.body;

    db.update(id, account)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => console.log(err))
})

module.exports = router