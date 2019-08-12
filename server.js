const express = require('express')

const db = require('./data/dbConfig.js')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.send('<h1>Homies helping the DB with Knex</h1>')
});

server.get('/api/accounts', (req, res) => {
    db("accounts")
        .then(item => {
            res.status(200).json(item)
        })
        .catch(error => {
            req.status(500).json({ tidings: "E.R.R.O.R Database Destroyed" })
        })
});

server.get('/api/accounts/:id', (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            res.status(500).json({ tidings: "There was an E.R.R.O.R with your request but dont worry youre not as dumb as you look." })
        });
})

server.post('/api/accounts', (req, res) => {
    const account = req.body;
    if (!account.name || !account.budget) {
        res.status(400).json({ tidings: "You can't do that! Add a name and budget." })
    } else {
        db("accounts")
            .insert(account)
            .then(account => {
                res.status(200).json(account)
            })
            .catch(error => {
                res.status(500).json({ tidings: "E.R.R.O.R. adding the Data!" })
            })
    }
});

server.put('/api/accounts/:id', (req, res) => {
    const changes = req.body;
    db("accounts")
        .where({ id: req.params.id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ tidings: 'Oh snap we cant find that id.' });
            }
        })
        .catch(error => {
            res.status(500).json({ tidings: 'E.R.R.O.R. while trying to update that account.' });
        });
});

server.delete('/api/accounts/:id', (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .del()
        .then(count => {
            count > 0 ? res.status(200).json(count) : res.status(400).json({ tidings: "Oops couldn't locate that account. Try again." })
        })
        .catch(error => {
            res.status(500).json({ tidings: "Big fat E.R.R.O.R. while trying to delete that account." })
        })
});



module.exports = server