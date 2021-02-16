const express = require('express');
const router = express.Router();
const Accounts = require('./account-model');

router.get('/', (req, res) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get('/:id', (req, res) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      if (!account.length) {
        res.status(200).json(account);
      } else {
        res.status().json(account);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/', (req, res) => {
  Accounts.create(req.body)
    .then((account) => {
      res.status(201).json(account);
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Accounts.update(id, changes)
    .then((updatedAccount) => {
      //   const updatedAccount = Accounts.getById(req.params.id).first();
      if (!id) {
        res.status(404).json({ message: 'Account does not exist' });
      } else if (!changes) {
        res.status(400).json({ message: 'Please provide name and budget' });
      } else {
        res.status(200).json(updatedAccount);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.delete('/:id', (req, res) => {
  Accounts.delete(req.params.id)
    .then((account) => {
      if (!account) {
        res.status(404).json({ message: 'No account found' });
      } else {
        res.status(200).json({ message: 'Account deleted successful' });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
