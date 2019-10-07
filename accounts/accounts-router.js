const router = require('express').Router();

// database
const db = require('../data/dbConfig.js');

// Basic site to '/'
router.get('/', (req, res) => {
  db.select('*').from('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Cannot access accounts...'})
    });
});

// get by id
router.get('/:id', (req, res) => {
  console.log(req.params.id)
  db.select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .first() // to get object
      .then(account => {
        res.status(200).json(account)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Cannot get that id...'})
      });
});

// POST 
router.post('/', validateAccount, (req, res) => {
  const postData = req.body;

  db('accounts')
    .insert(postData, 'id')
    .then(ids => {
      res.status(201).json({ids})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Cannot post...'})
    });
});

// PUT api/accounts/:id to update an account
router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('accounts')
    .where({ id: id})
    .update(req.body)
    .then(count => {
      count ? res.status(200).json({ message: 'Account has been updated...'}) : res.status(404).json({ message: `Cannot get ID ${id}`})
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'error updating account...'})
    });
});

// Delete /api/accounts delete an account...
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('accounts')
    .where({ id: id})
    .del()
    .then(count => {
      count ? res.status(200).json({ message: `Account with ID: ${id} deleted`}) : res.status(404).json({ message: 'Invalid account ID...'})
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json({ error: 'error deleting...'});
    });
});

// Custom Middleware

// Validate body on create/update 
function validateAccount(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Missing account data...' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Missing required "name" field...' });
  } else if (!req.body.budget) {
    res.status(400).json({ message: 'Missing required "budget" field...' });
  } else {
    next();
  }
}
module.exports = router;