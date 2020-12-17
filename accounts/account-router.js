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

module.exports = router