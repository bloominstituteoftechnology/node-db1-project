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
      .then(account => {
        res.status(200).json(account)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Cannot get that id...'})
      });
});

// POST 
router.post('/', (req, res) => {
  const postData = req.body;

  db('accounts')
    .insert(postData, 'id')
    .then(ids => {
      res.status(200).json(ids)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Cannot post...'})
    });
});


module.exports = router;