
const router = require('express').Router()
const Account = require('./accounts-model')
const middleware = require('./accounts-middleware')
const {checkAccountPayload, checkAccountId, checkAccountNameUnique} = middleware
router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC

  try {
    const accounts = await Account.getAll() 
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  } })


router.get('/:id', checkAccountId, async (req, res, next) => { 
try {
  const account = await Account.getById(req.params.id)
  res.status(200).json(account)
} catch (err) {
  next(err)
}
    // DO YOUR MAGIC
})

router.post('/', checkAccountNameUnique, checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  const newAccount = req.body;
 
  try {
    const postedAccount = await Account.create(newAccount)
    
    res.status(201).json(postedAccount);
  } catch (err) {
   
    next(err)
  }
})

router.put('/:id',checkAccountPayload, checkAccountId, async (req, res, next) => {
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
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
