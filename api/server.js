const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`Server is Running 🏃`);
});

server.get('/Account', async (req, res) => {
    try {
        const accounts = await db('accounts')
        if (accounts) {
            res.status(200).json(accounts)
        } else {
            res.status(404).json({ message: 'No Data to display' })
        }

        res.status(200).json
    }
    catch{
        res.status(500).json({ errMessage: 'Error with Database' })
    }
});

server.get('/Account/:id', async (req, res) => {
    const { id } = req.params
    try {
        const account = await db.select('*').from('accounts').where({ id }).first();

        if (account) {
            res.status(200).json(account)
        } else {
            res.status(400).json({ message: 'Acount not found' })
        }
    }
    catch{
        res.status(500).json({ errMessage: 'Error with Database' })
    }
})

server.post('/Account', async (req, res) => {
    const postData = req.body
    try {
        const account = await db.insert(postData).into('accounts');
        if (account) {
            res.status(201).json({ message: 'New Acount added' })
        } else {
            res.status(400).json({ message: 'Error adding Acount' })
        }

    }
    catch{
        res.status(500).json({ errMessage: 'Error postting' })
    }
})

server.delete('/Account/:id', async (req, res) => {
    const { id } = req.params
    try {
        const delData = await db('accounts').where({ id }).del();
        if (delData) {
            res.status(200).json({ message: 'Acount Deleted' })
        } else {
            res.status(404).json({ message: 'Acount not exist' })
        }
    }
    catch{
        res.status(500).json({ errMessage: 'Database Error' })
    }
})

server.put('/Account/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body
    try {
        const updated = await db('accounts').where({ id }).update(changes);
        if (updated) {
            res.status(200).json({ message: 'Acount Updated' })
        } else {
            res.status(404).json({ message: 'Acount not exist' })
        }
    }
    catch{
        res.status(500).json({ errMessage: 'Database Error' })
    }
})

module.exports = server;
