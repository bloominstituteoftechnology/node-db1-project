const express = require('express')

const router = express.Router()

const db = require("../data/dbConfig.js");

function get() {
    return db('accounts')
}

router.get('/', (req,res) => {
    get()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        console.log(err)
    })
})

function insert(account) {
    return db('accounts')
    .insert(account)
}

router.post('/', (req,res) => {
    insert(req.body)
    .then(res.status(200).json({message: "Added account!"}))
    .catch(err => {
        console.log(err)
    })
})

function update(id, changes) {
    return db('accounts')
    .where({id})
    .update(changes)
}

router.put('/:id', (req,res) => {
    update(Number(req.params.id), req.body)
    .then(res.status(200).json(req.body))
    .catch(err => {
        console.log(err)
    })
})

function remove(id) {
    return db('accounts')
    .where('id', id)
    .del()
}

router.delete('/:id', (req,res) => {
    remove(Number(req.params.id))
    .then(res.status(200).json({message: "Account deleted!"}))
    .catch(err => {
        console.log(err)
    })
})

module.exports = router