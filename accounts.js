const express = require('express');
const db = require('./data/dbConfig');
const { insert, where, del } = require('./data/dbConfig');
const router = express.Router();

// api/accounts
router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accounts => 
        res.status(200).json({data:accounts}))
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where('id', id)
    .first()
    .then(accounts => {
        res.status(200).json({ data: accounts })
    })
    .catch(err => console.log('get by id failed'))
});

router.post('/', (req, res) => {
    const accountData = req.body;
    db('accounts')
    .insert(accountData)
    .then(res.status(201).json({ data:accountData}))
    .catch(err => console.log('adding post failed'))
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('accounts')
    .where('id', id)
    .update(changes)
    .then(count => {
        if(count > 0) {
            res.status(200).json({ data:count })
        } else {
            res.status(404).json('Error updating accounts')
        }
    })
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where('id', id)
    .del()
    .then(count => {
        if(count > 0) {
            res.status(200).json({ data:count })
        } else {
            res.status(404).json('Error deleting post')
        }
    })
    .catch(err => console.log(err));
});

module.exports = router;
