const router = require('express').Router()

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try
  {
    const data = await Accounts.getAll()
    res.status(200).json(data)
  }
  catch (err)
  {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try
  {
    const data = await Accounts.getById(req.params.id)
    res.json(data)
  }
  catch (err)
  {
    next(err)
  }
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try
  {
    const data = await Accounts.create(req.body)
    res.status(201).json(data)
  }
  catch (err)
  {
    next(err)
  }

})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload,async (req, res, next) => {
  // DO YOUR MAGIC
  try
  {
    const data = await Accounts.updateById(req.params.id, req.body)
    res.status(201).json(data)
  }
  catch (err)
  {
    next(err)
  }
});

router.delete('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.remove(req.params.id)
  .then(()=> {
    res.status(200).json({
      message: `account deleted`
    })
  })
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    note: 'accounts not working',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
