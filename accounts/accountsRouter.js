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
        // const account = await DataBase("accounts").where("id", req.params.id).first()

        // translates to SELECT * FROM accounts WHERE id = some kind of id value (remember if you add first() it will return an object instead of an id)
        res.json(await DataBase.select("*").from("accounts").where("id", req.params.id));
    } catch(error){
        next(error);
    }
})

// need to create an account 
router.post('/', async (req, res, next) => {
    try{
        // create payload to use it on the insert function
        const payload = {
           name: req.body.name,
           budget: req.body.budget 
        }

        // translates to INSERT INTO accounts ( name, budget) values( some values)
       const [id] =  await DataBase("accounts").insert(payload);
       
       // return the object created here
       res.json(await DataBase("accounts").where("id", id).first());

    } catch(error){
        next(error);
    }
})

// updating account by id here
router.put('/:id', async (req, res, next) =>{
    try{
        // create payload to use it on the update function
        const payload = {
            name: req.body.name,
            budget: req.body.budget 
         }
         // translates to UPDATE accounts SET name = something budget = something WHERE id = some id value
         await DataBase("accounts").where("id", req.params.id).update(payload)
          
         // return the object created here
         res.json(await DataBase("accounts").where("id", req.params.id).first());
  
        } catch(error){
        next(error)
    }
})

// need to delete account by id here
router.delete('/:id', async (req, res, next) =>{
    try{
         // translates to DELETE FROM accounts  WHERE id = some id value
         await DataBase("accounts").where("id", req.params.id).del()
          
         // return a status code of deleted
         res.status(204).end();
  
        } catch(error){
        next(error)
    }
})

module.exports = router;