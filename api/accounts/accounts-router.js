const router = require('express').Router()
// pulling in middleware 
const md = require("./accounts-middleware")

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  try{
    //throw new Error('yikes!!!')
    res.json("get account")
  } catch(err)  {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json("get account id")
  } catch(err)  {
    next(err)
  }
})

router.post(
  '/', 
  md.checkAccountPayload, 
  md.checkAccountNameUnique, 
  (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json("post account")
  } catch(err)  {
    next(err)
  }
})

router.put(
  '/:id', 
  md.checkAccountId, 
  md.checkAccountNameUnique,
  md.checkAccountPayload,
  (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json("update account")
  } catch(err)  {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try{
    res.json("delete account")
  } catch(err)  {
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
