const router = require('express').Router()
const Accounts = require('./accounts-model')
// import middleware

const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId

} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  try {
    const data = await Accounts.get()
    res.json(data)

  } catch (err) {
    next (err)
  }
})
// R
router.get('/:id', checkAccountId, async (req, res) => {
  res.status(200).json(req.account)
})
// C
router.post('/', checkAccountPayload, (req, res, next) => {
try{
  const newAccount = await Accounts.create(req.body)
  res.status(201).json(newAccount)
} catch(err){
  next(err)
}
})
// U
router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  try {
    const updatedAccount = await Accounts.update(req.params.id, req.body)
    res.status(200).json(updatedAccount)
  } catch(err) {
    next(err)
  }

});
//  D
router.delete('/:id', (req, res, next) => {
  try{
    const deletedAccount = await Accounts.remove(req.params.id)
    res.json(deletedAccount)
  } catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({message: err.message, stack : err.stack})
  // DO YOUR MAGIC
})

module.exports = router;
