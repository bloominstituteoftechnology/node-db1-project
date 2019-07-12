const express = require('express');

const Accounts = require('./data/db-helpers.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {

});

server.get('/api/accounts/:id', (req, res) => {
  const { id } = req.params;
});

server.post('/api/accounts', (req, res) => {
  const newAccount = req.body;
});

server.put('/api/accounts/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    // update should resolve to a count of records updated
    const count = await Accounts.update(id, changes);

    if (count) {
      res.json({ updated: count });
    } else {
      res.status(404).json({ message: 'Could not find account with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update account' });
  }
});

server.delete('/api/accounts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // remove should resolve to a count of records removed
    const count = await Accounts.remove(id);

    if (count) {
      res.json({ deleted: count });
    } else {
      res.status(404).json({ message: 'Could not find account with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete account' });
  }
});

module.exports = server;