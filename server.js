const express = require('express');
const db = require('./data/accounts-model');

const server = express();
server.use(express.json());

// your code here
server.get('/', async (req, res) => {
  try {
    const accounts = await db.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Unable to process request' });
  }
});

server.get('/:id', async (req, res) => {
  try {
    const account = await db.findById(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: 'Unable to process request' });
  }
});

server.post('/', async (req, res) => {
  try {
    const account = await db.add(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: 'Unable to process request' });
  }
});

server.delete('/:id', async (req, res) => {
  try {
    const account = await db.remove(req.params.id);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: 'Unable to process request' });
  }
});

server.put('/:id', async (req, res) => {
  try {
    const account = await db.update(req.params.id, req.body);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: 'Unable to process request' });
  }
});

module.exports = server;
