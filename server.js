const express = require('express');
const db = require('./data/dbConfig.js');
const router = express.Router();
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not find accounts.'});
    })
});

server.post('/', (req, res) => {
    db.insert(req.body)
        .then(accounts => {
            res.status(201).json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Unable to add account.'});
        })
});

server.put('/:id', (req, res) => {
    db.update(req.accounts, req.body)
        .then(accounts => {
            res.status(203).json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Unable to edit account.'});
        })
})

server.delete('/:id', (req, res) => {
    db.remove(req.accounts)
        .then(accounts => {
            res.status(203).json({message: 'Account successfully deleted', deleted_records: `${name}`})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Unable to delete account.'})
        })
})


module.exports = server;


