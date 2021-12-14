const router = require('express').Router()

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json(['get accounts',{},{},{}])
  } catch (err) {
    next(err)
    //next({status:422, message: 'test error next'})
    //422 = unprocessable entity
  }
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('get account by id')
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('post account')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('update account')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json('delete account')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({
    message: err.message,
  })
})  
 
module.exports = router;
