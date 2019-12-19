const express = require('express')
const db = require('../data/dbConfig')
const accounts = require('../accounts')


const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
       return res.json(await db.select('*').from('accounts'))
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        return res.json(await db('accounts').where('id', req.params.id).first())k
    }
    catch(err) {
    next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})

router.post('/:id', async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err)
    }
})

module.exports = router