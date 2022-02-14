const router = require('express').Router()
const Accounts = require('./accounts-model')
const md = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(statement => {
      res.json(statement)
    })
    .catch(next)
})

router.get('/:id', md.checkAccountId, (req, res, next) => {
  const { id } = req.params
  Accounts.getById(id)
    .then(statement => {
      res.json(statement)
    })
    .catch(next)
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, (req, res, next) => {
  const { name, budget } = req.body
  Accounts.create({ name: name.trim(), budget: budget })
    .then(newAccount => {
      res.status(201).json(newAccount)
    })
    .catch(next)
})

router.put('/:id', md.checkAccountId, md.checkAccountPayload, md.checkAccountNameUnique, (req, res, next) => {
  const { id } = req.params
  Accounts.updateById(id, req.body)
    .then(async () => {
      const amend = await Accounts.getById(id)
        res.status(200).json(amend)
    })
    .catch(next)
});

router.delete('/:id', md.checkAccountId, (req, res, next) => {
  const { id } = req.params
  Accounts.deleteById(id)
    .then(rmAccount => {
      res.status(200).json(rmAccount)
    })
    .catch(next) 
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    custom: "Unable to retrieve from the database",
    message: err.message
  });
  next()

})

module.exports = router;
