const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await db.select('*').from('accounts');
    res.status(200).json(accounts);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Error retreiving accounts!' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [account] = await db
      .select('*')
      .from('accounts')
      .where({ id });
    // shortcut:
    // const [accounts] = await db ('accounts').where({id});
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: `Could not find account with id ${id}` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to get account!', err: err.message });
  }
});

router.post('/', async (req, res) => {
  const accountData = req.body;
  try {
    const account = await db('accounts').insert(accountData);
    res.send(201).json(account);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error getting your account!', err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db('accounts')
      .where('id', '=', id)
      .update(changes);
    if (count) {
      res.status(200).json({ updated: count });
    } else {
      res.status(404).json({ message: `Could not find account #${id}` });
    }
  } catch (err) {
    res
      .status(500)
      .jsons({ message: 'Could not update the account', err: err.message });
  }
});

module.exports = router;
