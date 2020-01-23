const express = require('express');

// will be using the router to handle request so I need data base in here 
const DataBase = require('../data/dbConfig.js')

// i need to create router using express to handle that
const router = express.Router();

// need to get all accounts using async code
router.get('/', async (req, res, next) =>{
    try{
        // translates to SELECT * FROM accounts
      res.json(await DataBase.select("*").from("accounts"));
    } catch(error){
        next(error)
    }
})

// I need to get account by its respective ID
router.get('/:id', async (req, res, next) =>{
    try{
        // translates to SELECT * FROM accounts
      res.json(await DataBase.select("*").from("accounts").where("id", req.params.id));
    } catch(error){
        next(error)
    }
})



module.exports = router;