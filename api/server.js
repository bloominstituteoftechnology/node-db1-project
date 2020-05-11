const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(validatePostPut);

server.get('/accounts', (req,res)=>{
    db('accounts')
        .then(accounts=>{
            if(accounts){
                res.status(200).json(accounts)
            }else{
                res.status(404).json({
                    message: 'data not found'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'trouble retrieving data'
            })
        })
})

server.get('/accounts/:id', (req,res)=>{
    db('accounts').where({id: req.params.id})
        .then(account=>{
            if(account.length > 0){
                res.status(200).json(account)
            }else{
                res.status(404).json({
                    message: 'there is no account with that id'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'trouble retrieving data'
            })
        })
})

server.post('/accounts', (req,res)=>{
    db.insert(req.body)
        .then(newID=>{
            res.status(200).json(newID)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'trouble adding the new account'
            }) 
        })
})

server.put('/accounts/:id', (req,res)=>{
    db('accounts').where({id: req.params.id})
    .update(req.body)
    .then(changes=>{
        res.status(200).json({
            message: `${changes} changes made`
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: 'trouble updating'
        }) 
    })

})

server.delete('/accounts/:id', (req,res)=>{
    db('accounts').where({id: req.params.id}).del()
    .then(changes=>{
        res.status(200).json({
            message: `${changes} accounts deleted`
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: 'trouble deleting'
        }) 
    }) 
})

function validatePostPut(req,res,next){
    if(req.method === 'POST' || req.method === 'PUT'){
        if(!req.body.name || !req.body.budget){
            res.status(400).json({
                message: 'please add a valid name and budget'
            })
        }else{
           next() 
        }
    }else{
        console.log('this is not a post or put request')
    }
}


module.exports = server;


