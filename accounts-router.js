const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

// When the client makes a `POST` request to `/api/accounts`:
// INSERT INTO Posts (ALL KEYS and VALUES)
router.post('/', async (req, res) => {
  const accountData = req.body

  try {
    const newAccount = await db('accounts').insert(accountData);
    res.status(201).json({newAccount: newAccount[0]});
  } catch(err) {
    res.status(500).json({ error: "failed to post data"})
  }
})

// When the client makes a `GET` request to `/api/accounts/`:
//SELECT * FROM accounts
router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts)
  } catch(err) {
    res.status(500).json({ error: "Unable to retrieve"})
  }
})

// When the client makes a `GET` request to `/api/accounts/:id`:
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const account = await db('accounts').where({ id });
    res.status(200).json(account[0])
  } catch(err) {
    res.status(500).json({ error: "Unable to get account" })
  }
})

// When the client makes a `PUT` request to `/api/accounts/:id`:
// UPDATE Posts SET change.key = changes.value WHERE id = id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body

  try {
    const updatedAccountCount = await db('accounts')
      .where({ id })
      .update(changes);

    res.status(200).json(updatedAccountCount)
  } catch(err) {
    res.status(500).json({ message: "Failed to update account" })
  }
})

// When the client makes a `DELETE` request to `/api/accounts/:id`:
//DELTETE FROM Posts where id = id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCount = await db('accounts').where('id', id).del();
    res.status(200).json(deleteCount);
  } catch(err) {
    res.status(500).json({ error: "unable to delete account" })
  }
})

//custom middleware
 /*
function validateProjectId(req, res, next) {
  const { id } = req.params;

  db('accounts').where({ id })
    .then(accounts => {
      const acc = accounts[0];
      if(acc) {
        req.accounts = accounts;
        next();
      } else {
        res.status(400).json({ message: "invalid ID" })
      }
    })
    .catch(err = {
      res.status(500).json({ error: "server error" })
    })
};
*/

module.exports = router
