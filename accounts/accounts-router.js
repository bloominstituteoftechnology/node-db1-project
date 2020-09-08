const express = require('express')
const router = express.Router()
const db = require('../data/dbConfig.js')

// get all 
router.get('/',  (req, res)=> {
    db('accounts')
    .then((accounts)=> res.status(200).json({data: accounts}))
    .catch((error)=> errorHandler(error, res))
} )

// get by id 
router.get('/:id', accountsIdValidation, (req, res)=>{
    const {id} = req.params
    db('accounts').where({id})
    .first()
    .then((account)=> res.status(200).json({data: account}))
    .catch((error)=> errorHandler(error, res))
})

// adding a new account to the data base
router.post("/", posttingValidation, (req,res)=>{
    const newAccount = req.body
    db('accounts').insert(newAccount, "id")
    .then((id)=> {
        db('accounts').where({id})
        .first()
        .then((account)=> res.status(201).json({data:account}))
        .catch((error)=> errorHandler(error, res))
    })
    .catch((error)=> errorHandler(error, res))
})

//deleting 
router.delete("/:id", accountsIdValidation, (req, res)=>{
    const {id} = req.params
    db('accounts').del().where({id})
    .then(count => res.status(204).json({data: count}))
    .catch((error)=> errorHandler(error, res))
})

// updating
router.put("/:id", accountsIdValidation, putValidation, (req, res)=>{
    const {id} = req.params
    const updating = req.body

    db('accounts').where({id}).update(updating)
    .then(() => {
        db('accounts').where({id})
        .first()
        .then(account => res.status(201).json({data: account}))
        .catch((error)=> errorHandler(error, res))
    } )
    .catch((error)=> errorHandler(error, res))
})





// error handler
function errorHandler (error, res) {
    res.status(500).json({errorMessage: error.message})
}

//middle wares
// id validation
function accountsIdValidation (req, res, next){
    const {id} = req.params
    db('accounts').where({id})
    .then((account)=> account.length === 0 ? res.status(404).json({message: "Make Sure To Provied The Correct ID"}): next())
    .catch((error)=> errorHandler(error, res))
}

// post body validation
function posttingValidation (req, res, next) {
    !req.body.name || !req.body.budget ? res.status(400).json({message: "Make Sure To Provied The Name And Budget"}) : next()
}

// put body validation 
function putValidation (req, res, next){
    !req.body.name && !req.body.budget ? res.status(400).json({message: "Make Sure To Provied The Name Or Budget"}) : next()
}
module.exports = router

// SELECT * FROM [Customers] where PostalCode=1010 limit 3

// SELECT phone FROM [Suppliers] where SupplierID=11;

// SELECT * FROM [Orders] order by OrderDate desc limit 10

// SELECT * FROM [Customers] where  city= "Madrid" or city= "London" or Country= "Brazil" 

// insert into [Customers] (CustomerName, ContactName, Address, City, PostalCode, Country) values ( "The Shire", "Bilbo Baggins", "1 Hobbit-Hole",  "Bag End", "111",  "Middle Earth")

//update[Customers] set PostalCode = 11122 where CustomerID = 92;