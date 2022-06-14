const router = require('express').Router()
// Pull in Middleware
const md = require('./accounts-middleware')
// Pull in Accounts Model
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch(err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  res.json(req.account)
})

// create
router.post('/', 
md.checkAccountPayload,
async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    //const name = await Account.
    const newAccount = await Account.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    })
    res.status(201).json(newAccount)
  } catch(err) {
    next(err)
  }
})

// update
router.put('/:id', 
md.checkAccountPayload,
 async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const exists =  await Account.getById(req.params.id)
    // console.log(exists)
    if (!exists) {
    
     return res.status(404).json({message: 'id does not exist'})
    } 
    const updated = await Account.updateById(req.params.id, req.body)
    
    res.json(updated)
  } catch(err) {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    await Account.deleteById(req.params.id)
    res.json(req.accout)
  } catch(err) {
    next(err)
  }
})

// General Error Handling Middleware
router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
  })

})

module.exports = router;
