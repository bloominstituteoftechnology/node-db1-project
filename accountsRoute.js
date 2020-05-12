const express = require ('express');
const router = express.Router();
const accounts = require('./data/db');


//Get accounts
router.get('/', (req, res) => {
    accounts
    .find(req.query)
    .then(acc => {
        res.status(200).json(acc);
    })
    .catch(err => {
        res.status(500).json({
            error:'The Accounts Info could not be retrieved'
        })
    })
});

//Get by id
router.get('/:id', validateAccountId, (req, res) => {
    accounts
    .findById(req.params.id)
    .then(acc => {
        res.status(200).json(acc);
    })
    .catch(err =>{
        res.status(404).json('That account\'s information could not be retrieved')
    })
});

//add account
router.post('/', validateAccount, (req, res) => {
    accounts
    .insert(req.body)
    .then(acc => {
        res.status(201).json(acc);
    })
    .catch(err => {
        res.status(500).json('An error occured while saving the account');
    });
});

//update account
router.put('/:id', validateAccountId, validateAccount, (req, res) => {
    accounts
    .update(req.params.id, req.body)
    .then(acc => {
        res.status(200).json(acc);
    })
    .catch(res => {
        res.status(500).json('The Account information couldn\'t be updated')
    })
})

//delete account
router.delete('/:id', (req, res) => {
    accounts
    .nuke(req.params.id)
    .then(acc => {
      res.status(200).json(acc);
    })
    .catch(err => {
      res.status(500)
        .json('An error occured while removing that account')
    });
  });


function validateAccountId (req, res, next) {
    accounts.findById(req.params.id)
            .then(acc => {
                if(acc){req.account = acc}
                else{
                 res.staus(400).json('Middleware: Invalid account id')
                };
            })
     next();
 };


 function validateAccount(req, res, next) {
    if(!req.body){res.status(400).json('missing account info')}
    else if(!req.body.name || ! req.body.budget){
        res.status(400).json('missing required text field')
    };
    next();
  }

module.exports = router;