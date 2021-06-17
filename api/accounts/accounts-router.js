const router = require('express').Router()
const accounts = require('./accounts-model.js');

const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware.js');

const router = express.Router();







// -[x] `[GET] /api/accounts` returns an array of accounts (or an empty array if there aren't any).
router.get('/api/accounts', (req, res, next) => {
  accounts.getAll(req.query)
        .then(accountsArray => {
            res.status(200).json(accountsArray)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error recieving accounts data'});
        });
})

// - [x]`[GET] /api/accounts/:id` returns an account by the given id.
router.get('/:id', checkAccountId, (req, res, next) => {
  accounts.getById(id)
        .then(acctId => {
            res.status(200).json(acctId)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({message: 'Error finding specific account id'});
        });
})

// - [x]`[POST] /api/accounts` returns the created account. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
router.post('/',checkAccountPayload,  (req, res, next) => {
  accounts.create(account)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "Couldn't create account"})
    })
})

// - [x]`[PUT] /api/accounts/:id` returns the updated account. Leading or trailing whitespace on budget `name` should be trimmed before saving to db.
router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  const {name, budget} = req.body
  accounts.updateById(id, req.body)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({message:"Could not update account"})
    })
});

// - [x]`[DELETE] /api/accounts/:id` returns the deleted account.
router.delete('/:id', checkAccountId, (req, res, next) => {
  accounts.deleteById(id)
    .then(() => {
      res.status(200).json(id)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error deleting this account"})
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
