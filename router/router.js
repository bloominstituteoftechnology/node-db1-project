const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.json(accounts);
  } catch (err) {
    res.json(500).json({message: "db problems", error:err});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const accounts = await db('accounts').where({id});
    res.json(accounts);
  } catch (err) {
    res.status(500).json({message: 'ID not found', error:err});
  }
});

router.post('/', async (req, res) => {
  const postAccounts = req.body;
  try {
    const numAccounts = await db('accounts').insert(postAccounts);
    res.status(201).json(numAccounts)
  } catch (err) {
    res.status(500).json({message: 'problem with db', error:err});
  }
});

router.put('/:id', async (req, res) => {
  const {id} = req.params;
  const updateAccounts = req.body;
  try {
    const count = await db('accounts').update(updateAccounts).where({id})
    if (count) {
      res.json({updated: count});
    } else {
      res.status(404).json({messge: 'invalid id'});
    }
  } catch (err) {
    res.status(500).json({message: 'problem with db', error:err});
  }
});

router.delete('/:id', async(req, res) => {
  const {id} = req.params;
  try {
    const compAccount = await db('accounts').del().where({id});
    if (compAccount) {
      res.json({deleted: compAccount});
    } else {
      res.status(404).json({messge: 'invalid id'});
    }
  } catch (err) {
    res.status(500).json({message: 'problem with db', error:err});
  }
});

module.exports = router;