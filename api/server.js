const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get( '/api', async (req, res, next )=>{
    try{

       const accounts = await db.select('*').from('accounts');

       res.json(accounts)

    } catch (err){
        next(err);
    }

})

server.get('/api/:id', async( req, res, next)=>{
    try{
        const id = await db
        .select("id", "name")
        .from("accounts")
        .where("id", req.params.id)

        res.send(id)
    } catch(err){
        next(err)
    }
})

module.exports = server;
