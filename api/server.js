const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
    .then(users => {
      res.json(users);
    }) 
    .catch (err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
  });

  server.post('/api/accounts', (req, res) => {
      const new_account = { name: 'anam', budget: 1233 };
    db('accounts').insert(new_account).then(users => {
        res.status(200).json(new_account);
      }) 
      .catch (err => {
        res.status(500).json({ message: 'Failed to get users' });
      });
  });


  server.put('/api/accounts', (req, res) => {
    db('accounts').where({ id: 3 })
    .update({name: 'Ava', budget: 33 }).then(users => {
        res.status(200).json({ message: 'update worked' });
      }) 
      .catch (err => {
        res.status(500).json({ message: 'Failed to get users' });
      });
  });

  server.delete('/api/accounts', (req, res) => {
    db('accounts').where({ id: 3}).del().then(users => {
        res.status(200).json({ message: 'delete worked' });
      }) 
      .catch (err => {
        res.status(500).json({ message: 'Failed to get users' });
      });;

  });

module.exports = server;
