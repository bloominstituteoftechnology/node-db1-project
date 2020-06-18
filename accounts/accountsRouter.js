const express = require('express');
const router = express.Router();

const db = require('../data/dbConfig.js');


router.get('/', (req, res) => {
  let query =db('accounts');
  if(req.query.sortby){
    if(req.query.sortdir){
      query.orderBy(req.query.sortby,req.query.sortdir)
    } else{
      query.orderBy(req.query.sortby)
    }
  }
  if(req.query.limit){
    query.limit(req.query.limit)
  }

    query.then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: 'Could not retrieve the list of accounts' });
    });
});


router.get('/:id', (req, res) => {
  db('accounts')
    .where({id: req.params.id})
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    })
    .catch(error => {
      res.status(500).json({errorMessage:'Could not retrieve account data'});
    });
});

router.post('/', (req, res) => {
  const accountData = req.body;
  // validate
  if(!accountData.name || !accountData.budget){
    res.status(400).json({errorMessage:'Please provide a name and budget.'})
  }
  if(typeof accountData.name !== 'string'){
    res.status(400).json({errorMessage:'name provided is not a string'})
  }
  if(typeof accountData.budget !== 'number'){
    res.status(400).json({errorMessage:'budget provided is not a number'})
  }
  db('accounts')
    .insert(accountData, 'id')
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(error => {
      if(error.errno === 19){
        res.status(500).json({errorMessage:'The name field needs to be unique'});
      } else {
        res.status(500).json({errorMessage:'There was an error updating the account'});
      }
    });
});

router.put('/:id', (req, res) => {
  if(req.body.name || req.body.budget){
    if(req.body.name && typeof req.body.name !== 'string')
      res.status(400).json({errorMessage:'name provided is not a string'})
    if(req.body.budget && typeof req.body.budget !== 'number')
      res.status(400).json({errorMessage:'budget provided is not a number'})

  } else {
    res.status(400).json({errorMessage:'Please provide a name or budget.'})
  }
  db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'Account does not exist' });
      }
    })
    .catch(error => {
      if(error.errno === 19){
        res.status(500).json({errorMessage:'The name field needs to be unique'});
      } else {
        res.status(500).json({errorMessage:'There was an error updating the account'});
      }
    });
});

router.delete('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
