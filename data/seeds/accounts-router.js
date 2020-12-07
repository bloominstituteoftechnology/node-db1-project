const express = require('express')
const router = express.Router()
const Account = require('./accounts-model')

router.get('/', async (req, res) => {
    try {
        const data = await Account.getAll()
        res.json(data)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Account.getById(id)
        res.json(data)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
const validateAccount = (req, res, next) => next()

router.post('/', validateAccount, async (req, res) => {
    try {
        const account = req.body
        const data = await Account.create(account)
res.json(data)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const changes = req.body
        await Account.update(id, changes)
        const updated = await Account.getByID(id)
        res.json(updated)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Account.delete(id)
        res.json({message: `account with id ${id} was deleted`})
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

module.exports = router;