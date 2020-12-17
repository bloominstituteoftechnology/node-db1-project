const express = require('express')

const router = express.Router()

const account = require('./account-model')

router.get('/', (req,res,next) => {
    account.find()
        .then((act) => {
            res.status(200).json(act)
        })
        .catch((err) => {
            next(err)
        })
})

router.post('/', (req,res,next) => {
    account.insert(req.body)
        .then((act) => {
            res.status(200).json(act)
        })
        .catch((err) => {
            next((err))
        })
})

router.delete('/:id', (req,res,next) => {
    account.remove(req.params.id)
    .then((count) => {
        if(count > 0) {
          res.status(200).json({
            message: "The account has been removed"
          }) 
        } else {
          res.status(404).json({
            message: "The account could not be removed"
          })
        }
      })
})

module.exports = router