const express = require('express')
const Account = require('./account-model')
const { validateId, validateAccount } = require('../middleware/middleware')

const router = express.Router()

router.get('/', async(req, res, next) =>{
    try{
        const accounts = await Account.get()
        res.status(200).json(accounts)
    } catch(error){
        next(error)
    }
})

router.get('/:id', validateId, async (req, res, next) =>{
    try{
        const { id } = req.params
        const data = await Account.getById(id)
        res.status(200).json(data)
    } catch(error){
        next(error)
    }
})

router.post('/', validateAccount, async (req, res, next) =>{
    try{
        const account = req.body
        const data = await Account.create(account)
        res.status(201).json(data)
    } catch(error){
        next(error)
    }
})

router.put('/:id', validateAccount, validateId, async (req, res, next) =>{
    try{
        const { id } = req.params
        const account = req.body
        const data = Account.update(id, account)
        res.status(200).json(data)
    } catch(error){
        next(error)
    }
})

router.delete('/:id', validateId, async (req, res, next) =>{
    try{
        const { id } = req.params
        const data = await Account.remove(id)
        res.status(200).json(data)
    } catch(error){
        next(error)
    }
})

router.use((error, req, res, next) =>{
    res.status(500).json({message: error.message, stack: error.stack})
})

module.exports = router;
