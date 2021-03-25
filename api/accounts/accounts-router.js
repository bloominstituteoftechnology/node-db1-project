const router = require('express').Router()
const Accounts = require('./accounts-model')
const ExpressError = require('../expressError')

const Middleware = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.status(200).json(accounts)
  } catch (err) {
    next(new ExpressError(err, 500));
  }
  // DO YOUR MAGIC
})

router.get('/:id', Middleware.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).json(req.account);
})

router.post('/', Middleware.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    console.log("api router",req.body)
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
})

router.put('/:id', Middleware.checkAccountPayload, Middleware.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  console.log(req.params.id, req.body)

  try {
    console.log(req.params.id, req.body)

  const updatedAccount = await Accounts.updateById(req.params.id, req.body);
  res.status(200).json(req.body);
  } catch (err) {
    next(new ExpressError(err, 500));
  }
  
});

router.delete('/:id', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = await Accounts.deleteById(req.params.id)
    res.status(200).json({ message: "Account has been deleted"})
  } catch (err) {
    next(new ExpressError(err, 500));
  }
})

// router.use((err, req, res, next) => { // eslint-disable-line
//   // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
//   res.status(500).json({
//     message: 'something went wrong inside the accounts router',
//     errMessage: err.message,
//   })
// })

module.exports = router;
