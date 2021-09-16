const router = require('express').Router()
const accRoutMW = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
    //res.json('get accounts')
    //res.json( [ {}, {lol:'lol'}, {}])
    //throw new Error('kabloinZZZGGZ')
  } catch (err) {
    next(err)
    //or
    // next( {status: 422, message: "this is bad john, we errored"} )
  }
})

router.get('/:id', accRoutMW.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await Account.getById(req.params.id)
    res.json(account)
  } catch (err) {
    next(err)
  }
  // ^ middleware takes care of it

  // res.json(req.account)
})


router.post('/', accRoutMW.checkAccountPayload, 
accRoutMW.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const newAccount = await Account.create({name: req.body.name.trim(),
    budget: req.body.budget})
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})


router.put('/:id', accRoutMW.checkAccountId, 
accRoutMW.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const updated = await Account.updateById(req.params.id, req.body)
    res.json(updated)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', accRoutMW.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Account.deleteById(req.params.id)
    //res.json('delete account')
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

//this is our error handling middleware all the     catch(err){next(err)}   point :
router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
