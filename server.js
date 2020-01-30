const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("<h3>Jake's Node db1 Project</h3>");
  });

server.get('/api/accounts', async (req, res) => {
    try{
        const accts = await db('accounts');
        res.status(200).json(accts);
    } catch (err) {
        res.status(500).json({message: 'Failed to get accounts!', err});
    };
});

server.get('/api/accounts/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const acct = await db('accounts')
        .where('id', id);
        res.status(200).json(acct);
    } catch (err) {
        res.status(500).json({message: 'Failed to get account!', err});
    };
});

server.post('/api/accounts', async (req, res) => {
    const data = req.body;

    try{
        const addedAcct = await db('accounts')
        .insert(data);
        res.status(201).json(addedAcct);
    } catch (err) {
        res.status(500).json({message: 'Failed to add the account!', err});
    };
});

server.put('/api/accounts/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try{
        const changedAcct = await db('accounts')
        .where('id', id)
        .update(data);
        res.status(201).json(changedAcct);
    } catch (err) {
        res.status(500).json({message: 'Failed to change account!', err});
    };
});

server.delete('/api/accounts/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const deletedAcct = await db('accounts')
        .where('id', id)
        .del();
        res.status(200).json(deletedAcct);
    } catch (err) {
        res.status(500).json({message: 'Failed to delete account!', err});
    };
});

module.exports = server;