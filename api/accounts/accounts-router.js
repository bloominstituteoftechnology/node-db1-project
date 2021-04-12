const router = require('express').Router()
const accounts = require("./accounts-model.js")
const mw = require("./accounts-middleware.js")

router.get('/', (req, res, next) => {
    accounts.getAll(req.query.limit, req.query.sortby, req.query.sortdir)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        next(error)
    })
})

router.get('/:id', mw.checkAccountId, (req, res, next) => {
    accounts.getById(req.params.id)
    .then(account=>{
        res.status(200).json(account)
    })
    .catch(error=>{
        next(error)
    })
})

router.post('/', mw.checkAccountPayload, mw.checkAccountNameUnique, (req, res, next) => {
    accounts.create(req.body)
    .then(account=>{
        res.status(201).json(account)
    })
    .catch(error=>{
        next(error)
    })
})

router.put('/:id', mw.checkAccountId, mw.checkAccountPayload, mw.checkAccountNameUnique, (req, res, next) => {
    accounts.updateById(req.params.id, req.body)
    .then(async ()=>{
        const account = await accounts.getById(req.params.id)
        res.status(200).json(account)
    })
    .catch(error=>{
        next(error)
    })
});

router.delete('/:id', mw.checkAccountId, (req, res, next) => {
    accounts.deleteById(req.params.id)
    .then(account=>{
        res.status(200).json(account)
    })
    .catch(error=>{
        next(error)
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({message: err.message})
})

module.exports = router;