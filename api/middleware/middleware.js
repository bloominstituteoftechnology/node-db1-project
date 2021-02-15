const { json } = require('express')
const Accounts = require('../accounts/account-model')

async function validateId(req, res, next){
    const { id } = req.params
    const idExists = await Accounts.getById(id)
    if(idExists){
        next()
    } else{
        res.status(400).json({message: 'Id does not exist in DB'})
    }
}

function validateAccount(req, res, next){
    const {name, budget} = req.body
    if(name && budget){
        next()
    } else{
        res.status(400),json({message: 'Name and budget required'})
    }
}

module.exports={
    validateAccount,
    validateId
}