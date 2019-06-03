const express = require('express')

const Accounts = require('./accounts-model.js')

const router = express.Router();

// router.get('/', async (req,res) => {
//     try{
//         const accounts = await Accounts.find(req.params.id)
//         console.log(accounts)
//         res.status(200).json(accounts)
//     }
//     catch(error) {
//         res.status(500).json({error:'the accounts could not be retreived'})

//     }
// });

//or

router.get('/', (req,res) => {
    Accounts
    .find()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        res.status(500).json({err:error})
    })
})

// router.post('/', async (req,res) => {
//     try{
//         console.log('req body ',req.body)
//         if(!req.body.name || !req.body.budget){
//             res.status(400).json({errorMessage:'Please provide name and budget for the account being created'})
//         }

//         else{
//         const accounts = await Accounts.add(req.body)
//         console.log('accounts ',accounts)
//         res.status(201).json(accounts)

//         }
//     }
//     catch(error){
//         res.status(500).json({error:'There was an error while saving the account to the database'})
//     }
// });

//or

router.post('/', validateAccount, (req,res) => {
    Accounts
    .add(req.body)
    .then(accounts => {
        res.status(201).json(accounts)
    })
    .catch(error => {
        res.status(500).json({message:'There was an error while saving the account to the database'})
    })
})

// router.put('/:id', async(req,res) => {
//     try{
//         console.log(req.body)
//         if(!req.body.name || !req.body.budget){
//             res.status(400).json({errorMessage:'Please provide name and budget for the account being created'})

//         }
//         else{
//             const accounts = await Accounts.update(req.params.id,req.body)
//             console.log('accounts ',accounts)
            
//             if(accounts){
//             res.status(200).json(accounts)
//         }
//         else{
//             res.status(404).json({errorMessage:'The account with the specified id does not exist.'})
//         }
//             }
//         }
//         catch(error){
//             res.status(500).json({error:'There was an error while saving the account to the database'})
//         }
// });

//or

router.put('/:id', validateUserId,(req,res) => {
    Accounts.update(req.params.id,req.body)
    .then(account => {
        res.status(200).json(account)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

// router.delete('/:id', async (req,res)=>{
//     try{
//         console.log('delete id ',req.params.id)
//         const count = await Accounts.remove(req.params.id);
//         console.log('delete count ',count)
//         if(count>0){
//             res.status(200).json();
//         }
//         else{
//             res.status(404).json({message:'The account with the specified id does not exists'})
//         }
//     }
//     catch {
//         res.status(500).json({error:'The account could not be removed'})
//     }
// });

//or

router.delete('/:id', validateUserId,(req,res) => {
    Accounts.remove(req.params.id,req.body)
    .then(account => {
        res.status(200).json(account)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

function validateAccount(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing user data" })
    } else if (!req.body.name || !req.body.budget) {
        res.status(400).json({ message: "missing required name or budget field" })
    } else {
        next();
    }
};

function validateUserId(req, res, next) {
    Accounts.findById(req.params.id)
    .then(user => {
        if(user){
        req.user = user;
        next();
    }
    else{
        res.status(404).json({message:"user id not found"})
    }
    })
    .catch(error => {
        res.status(500).json({message:'user not found'})
    })
    
};
module.exports = router;