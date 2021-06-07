const router = require('express').Router();
const db = require('../../data/db-config');
const accountMW = require('./accounts-middleware');
const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts)
  } //end of try
  catch (err) {
    next(err)
  }//end of catch
})

router.get('/:id', accountMW.checkAccountId, async (req, res, next) => {
  const id = req.params.id
  try {
    const account = await Account.getById(id);
    res.json(account)
  } //end of try
  catch (err) {
    next(err)
  }//end of catch
})

router.post('/', accountMW.checkAccountNameUnique, accountMW.checkAccountPayload, async (req, res, next) => {
  const body = req.body;
  try {
    const newAccount = await Account.create(body)
    res.status(201).json(newAccount)
  } //end of try
  catch (err) {
    next(err)
  }//end of catch
})

router.put('/:id', accountMW.checkAccountId, accountMW.checkAccountPayload, async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updated = await Account.updateById(id,body )
    res.json(updated)
  } //end of try
  catch (err) {
    next(err)
  }//end of catch
});

router.delete('/:id', accountMW.checkAccountId, async (req, res, next) => {
  const id = req.params.id;
  try {
   
    console.log('ID!!', id)
    await Account.deleteById(id)
    res.json(req.account)
  } //end of try
  catch (err) {
    next(err)
  }//end of catch
})


router.use((err, req, res, next) => {
  res.status(err.status || 404).json({
    message:err.message
  })
})

module.exports = router;