
const router = require('express').Router()

const imports = require('./account-middleware')
const checkAccountId = imports.checkAccountId
const checkAccountPayload = imports.checkAccountPayload
const checkAccountNameUnique = imports.checkAccountNameUnique

const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll() 
    console.log("accounts: ", accounts)
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => { 
  res.status(200).json(req.account) 
    // DO YOUR MAGIC
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  const newAccount = req.account;
  console.log("newAccount: ", newAccount);
  console.log("req.account", req.body);
  try {
    const postedAccount = await Account.create(newAccount)
    console.log("postedAccount: ", postedAccount);
    res.status(201).json(postedAccount);
  } catch (err) {
    console.log("Error in create: ", err)
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  const changes = req.body;
  try {
    const updatedAccount = await Account.updateById(id, changes);
    console.log("updatedAccount: ", updatedAccount);
    res.status(200).json(updatedAccount);
  } catch (err) {
    console.log("Error in updateById: ", err)
    next(err)
  }
});

router.delete('/:id', checkAccountId, async  (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  try {
    const deletedAccount = await Account.deleteById(id);
    console.log("deletedAccount: ", deletedAccount);
    res.status(200).json(deletedAccount);
  } catch (err) {
    console.log("Error in deleteById: ", err)
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
