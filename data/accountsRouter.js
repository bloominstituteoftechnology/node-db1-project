const express = require('express');

//db is the way of using knex code to *talk* to the Data Base.
const db = require('./dbConfig.js');

const router = express.Router();

router.get('/', (req,res) => {
    // res.send('hit the get GET /api/posts');
    db.select('*').from('accounts')
        .then(rows => {
            res.status(200).json(rows);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error getting all accounts!`})
        });
})

router.get('/:id', (req,res) => {
    const { id } = req.params;
    db.select('*').from('accounts').where('id', '=', id)
    //can say: first()
    //if want to get the first item in the array only --> i.e. will only 
    //get "row" vv
    .then(rows => {
        res.status(200).json(rows[0]);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: `error getting all accounts!`})
    });
})


router.post('/', validateAcctPost, (req,res) => {
    const newAcct = req.body;
    
    db('accounts').insert(newAcct, 'id')
        .then(newAcctID => {
            res.status(201).json(newAcctID)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error adding new account!`})
        });
        
})

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    db.select('*').from('accounts').where({id}).delete(id)
        .then(deletedReccords => {
            res.status(204).json(deletedReccords)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error deleting the account!`})
        });
})

router.put('/:id', (req,res) => {
    const { id } = req.params;
    changes = req.body;
    db('accounts').where({id}).update(changes)
        .then(updatedA => {
            res.status(200).json(updatedA)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error adding new account!`})
        });
})



//custom middleware:
function validateAcctPost(req,res,next) {
    // const { id } = req.body;
    const { name } = req.body;
    const { budget } = req.body;


    if(!req.body) {
        return res.status(400).json({error: `must provide a body to create a new acct!`});
    }

    if(!name){
        return res.status(400).json({error: `must provide a NAME for a new acct!`});
    }
    
    if(!budget){
        return res.status(400).json({error: `must provide a BUDGET for a new acct!`});
    }

    if(typeof name !== "string"){
        return res.status(400).json({error: `must provide string for name`});
    }
    if(typeof budget !== "number"){
        return res.status(400).json({error: `must provide NUM for budget`});
    }
    req.body = {name, budget}
    next();

}


module.exports = router;