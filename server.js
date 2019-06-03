const express = require('express');

const db = require('./data/accounts-model')

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db
        .find()
        .then(rows => {
            res.status(200).json({rows})
        })
        .catch(error => {
            res.status(500).json({error: "Information could not be retrieved"})
        })
})

server.get('/api/accounts/:id', async (req, res) => {
    try {
        const account = await db.findById(req.params.id);
        if (account.length===0) {
            res.status(404).json({message: "The account with the specified ID does not exist"})
        } else {
            res.status(200).json(account);
        }
    } catch (error) {
        res.status(500).json({error: "The information could not be retrieved."})
    }
});

server.post('/api/accounts', (req, res) => {
    const {name, budget} = req.body;
    if (!name || !budget) {
        res.send(400).json({ message: "Please provide name and budget for the account"})
    }
    db
        .add({
            name,
            budget
        })
        .then(account => {
            res.status(201).json(account);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving account to the database"})
        })
})

server.delete('/api/accounts/:id', (req, res) => {
    const id = req.params.id
    db
        .remove(id)
        .then(id => {
            if (id > 0) {
                res.status(200).json({message:`${id} record(s) has/have successfully been deleted`})
                
            } else {
                res.status(404).json({ message: "The account with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500).json({error: "The account could not be removed"})
        })
})

server.put('/api/accounts/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    db 
        .update(id, changes)
        .then(id => {
            if (id === 1) {
                res.status(200).json({message:`${id} record has been successfully updated`})
            } else {
                res.status(404).json({message: "The account with the specified ID does not exist."})
            }
        })
        .catch(error => {
            res.status(500).json({message: "error updating account"})
        }) 
})

module.exports = server;