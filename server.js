const express = require('express');
const Accounts = require('./data/accounts-model.js');

const server = express();

// your code here
server.use(express.json());

server.get('/', async (req, res) => {
    try{
        const accounts =  await Accounts.find();
        res.status(200).json(accounts);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error retrieving accounts"
        })
    }
});

server.post('/', async (req, res) => {
    try{
        const account = await Accounts.add(res.body);
        res.status(200).json(account);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error adding account"})
    }
    
});

server.put('/:id', async (req, res) => {
    try{
        const account = await Accounts.update(req.params.id, req.body)
        if(account){
            res.status(200).json(account);
        } else{
            res.status(404).json({ message: "The account could not be updated"})
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error updating account" })
    }
});

server.delete('/:id', async (req, res) => {
    try{
        const count = await Accounts.remove(req.params.id);
        if(count>0){
            res.status(200).json({ message: 'THe account has been deleted' })
        }else{
            res.status(404).json({ message: "The account could not be found" })
        }
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Error removing account" })
    }
});
module.exports = server;