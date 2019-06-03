const express = require('express');

const db = require('./data/accounts-model')

const server = express();

server.use(express.json());

server.get('/api/budget', (req, res) => {
    db
        .find()
        .then(rows => {
            res.status(200).json({rows})
        })
        .catch(error => {
            res.status(500).json({error: "Information could not be retrieved"})
        })
})

server.get('/api/budget/:id', async (req, res) => {
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

// your code here



module.exports = server;