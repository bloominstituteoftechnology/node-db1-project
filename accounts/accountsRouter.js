const express = require('express')
const { disabled } = require('../api/server.js')

const db = require('../data/dbConfig.js')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const sql = await db('accounts').toString()
        console.log(sql)
        const accounts = await db('accounts')
        console.log(accounts)
        res.status(200).json(accounts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "error with db", error: error
        })
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params

    try{
        const [account] = await db.select('*').from('accounts').where('id', id)
        if (account) {
            res.status(200).json(account)
        } else {
            res.status(404).json({
                message: "account not found"
            })
        }
    } catch (error){
        console.log(error)
        res.status(500).json({
            message: 'a db error occured'
        })
    }
})

router.post('/', async (req, res) => {
    const newAccount = req.body
    try{
        const account = await db.insert(newAccount).into('accounts')
        res.status(200).json({
            message: "account created", id: account})
    } catch (error){
        console.log(error)
        res.status(500).json({
            message: 'a db error occured'
        })
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const changes = req.body

    try {
        const sql = await db('accounts').update(changes).where('id', id).toString()
        console.log(sql)
        const [account] = await db.select('*').from('accounts').where('id', id)
        if (account) {
            db('accounts').update(changes).where('id', id)
            res.status(200).json({
                updated: account, changes: changes
            })
        } else {
            res.status(404).json({
                message: "account not found"
            })
        }
    } catch (error){
        console.log(error)
        res.status(500).json({
            message: 'a db error occured'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const count = await db.del().from('accounts').where('id', id)
        if (count) {
            res.status(200).json({
                deleted: count
            })
        } else {
            res.status(404).json({
                message: "account not found"
            })
        }
    } catch (error){
        console.log(error)
        res.status(500).json({
            message: 'a db error occured'
        })
    }
})



module.exports = router