const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/:id', (req, res) => {
  // an accounts by its id
  // select * from accounts where id = :id
  db.select('*').from('accounts')
    .where({ id: req.params.id })
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to get requested account" });
    });
});

router.post('/', (req, res) => {
  // add an account
  db('accounts')
    .insert(req.body, 'id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to add the accounts" });
    });
});

router.put('/:id', (req, res) => {
  // update an account
  const id = req.params.id;
  const changes = req.body;
  db('accounts')
    .where({ id }) // remember to filter or all records will be updated
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to update the accounts" });
    });
});

router.delete('/:id', (req, res) => {
  // delete an accounts
  const id = req.params.id;
  db('accounts')
    .where({ id }) // remember to filter or all records will be deleted
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to delete the accounts" });
    });
});

router.get('/', (req, res) => {
  // list of accounts
  db.select('*').from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to get the list of accounts" });
    });
});

module.exports = router;