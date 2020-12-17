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

router.put('/:id', (req,res,next) => {
    if(!req.body.name || !req.body.budget) {
        res.status(400).json({
            message: "missing fields"
        })
    }

    account.update(req.params.id, req.body)
        .then((act) => {
            if(act) {
                res.status(200).json(act)
            } else {
                res.status(404).json({
                    message: "account could not be found"
                })
            }
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router