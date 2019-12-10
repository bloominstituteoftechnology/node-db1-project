const express = require('express')

const knex = require('../data/dbConfig')

const router = express.Router();

const validateId = require('../middleware/validate')

router.get ('/', (req,res) => {
    knex.select('*').from('accounts').then(gets => {
        res.status(200).json(gets)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMess: "error getting the accounts"})
    })
})

router.get('/:id', (req, res) => {
    knex.select('*').from ('accounts')
    .where({ id: req.params.id })
    .then(getId => {
        res.status(200).json(getId)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMess: "error getting the accounts id"})
    })
})

router.post('/', (req, res) => {
    const postData = req.body
    knex('accounts')
    .insert(postData, 'id')
    .then(ids => {
        const id = ids[0]
        return knex('accounts')
        .where({ id })
        .then(posts => {
            res.status(201).json(posts)
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMess: "error getting the posts"})
    })
})
router.put('/:id', validateId, (req, res) => {
    const { id } = req.params
    const newData = req.body

    knex('accounts')
    .where({ id })
    .update(newData)
    .then(putter => {
        if(putter > 0){
            res.status(200).json({ message: `${putter} record(s) updated` })
        } else {
            res.status(404).json({ message: 'account not found' })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            errorMessage: "error updating the account"
        })
    })
})

router.delete('/:id', validateId, (req, res) => {
    knex('accounts')
    .where({ id: req.params.id })
    .del()
    .then(gone => {
        res.status(200).json({ message: `${gone} record(s) removed`})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: 'error removing the post'})
    })
})


module.exports = router;