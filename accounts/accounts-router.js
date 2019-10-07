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