const express = require('express');
const db = require('./data/dbConfig');
const { insert, where, del } = require('./data/dbConfig');
const router = express.Router();

// api/accounts
router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accounts => 
        res.status(200).json({data:accounts}))
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
    .where('id', id)
    .first()
    .then(accounts => {
        res.status(200).json({ data: accounts })
    })
    .catch(err => console.log('get by id failed'))
});

router.post('/', (req, res) => {
    const accountData = req.body;
    db('accounts')
    .insert(accountData)
    .then(res.status(201).json({ data:accountData}))
    .catch(err => console.log('adding post failed'))
});

router.put('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Could not update the account' });
    });
});

router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted` });
    })
    .catch(() => {
      res.status(500).json({ message: 'Could not remove the account' });
    });
});

module.exports = router;