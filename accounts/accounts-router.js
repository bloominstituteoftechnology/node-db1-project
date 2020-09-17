const express = require('express');
const db = require("../data/dbConfig.js");
const { query } = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    const {limit, sortby, sortdir} = req.query;
    if(limit){
        console.log("in the limit loop")
        db.select('*')
        .from('accounts')
        .limit(limit)
        .then(accounts =>{
            res.status(200).json({data: accounts})
        })
        .catch(error=>{
            handleError(error, res);
        });
    }else if(sortby && sortdir){
        console.log("sort query");
        db.select('*')
        .from('accounts')
        .orderBy(sortby, sortdir)
        .then(accounts =>{
            res.status(200).json({data: accounts})
        })
        .catch(error=>{
            handleError(error, res);
        });
    }else {
        console.log("default");
        db.select('*')
        .from('accounts')
        .then(accounts =>{
            res.status(200).json({data: accounts})
        })
        .catch(error=>{
            handleError(error, res);
        });
}});



router.get('/:id', (req, res) =>{
    const {id} = req.params;
    db.select('*')
    .from('accounts')
    .where({id})
    .first()
    .then(account =>{
        res.status(200).json({data:account})
    })
    .catch(error=>{
        handleError(error, res);
    });
});

router.post('/', (req, res) =>{
    const accountData = req.body;
    db('accounts')
        .insert(accountData)
        .then((id) => {
           db.select('*').from("accounts").where({id:id[0]}).then(newAccount=>{
            res.status(201).json(newAccount[0])
           })
            
        })
        .catch(error=>{
            handleError(error, res);
        });
});

router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;
    db('accounts')
        .where({id})
        .update(changes)
        .then(count =>{
            if (count > 0){
                res.status(200).json({data: count});
            }else{
                res.status(404).json({message: 'there was no account to update'})
            }
        })
        .catch(error=>{
            handleError(error, res);
        });
});

router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    db('accounts')
        .where({id})
        .del()
        .then(count =>{
            if (count > 0){
                res.status(200).json({data: count});
            }else{
                res.status(404).json({message: 'there was no account to update'})
            }
        })
        .catch(error=>{
            handleError(error, res);
        });
});

function handleError(error, res){
    console.log("error", error)
    res.status(500).json({message: error.message});
}


module.exports = router;