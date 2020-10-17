const express = require("express");

const db = require("../data/dbConfig.js");
const { dnsPrefetchControl } = require("helmet");

const server = express();

server.use(express.json());

server.get("/accounts", async(req,res,next) => {
    try{
        const accounts = await db("accounts").select("*");
        res.json(accounts);
    }
    catch(error){
        next(error)
    }
});

server.get("/accounts/:id", async(req, res, next)=>{
    try{
        const account = await db("accounts").select("*").where("id", req.params.id);
        res.json(account);
    }
    catch(error){
        next(error)
    }
});

server.post("/accounts", async(req, res, next)=>{
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        if(!payload.name || !payload.budget){
            return res.status(400).json({message:"Please enter correct information!"});
        }
        const [id] = await db("accounts").insert(payload);
        const [message] = await db("accounts").select("*").where("id", id);
        res.status(201).json(message)
    }
    catch(error){
        next(error)
    }
});

server.put("/accounts/:id", async(req, res, next)=>{
    try{
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        };
        if(!payload.name || !payload.budget){
            return res.status(400).json({message:"Please enter all the information to update!"})
        }
        await db("accounts").where("id", req.params.id).update(payload);
        const [message] = await db("accounts").select("*").where("id", req.params.id);
        res.status(201).json(message);
    }
    catch(error){
        next(error)
    }
});

server.delete("/accounts/:id", async(req, res, next)=>{
    try{
        await db("accounts").where("id", req.params.id).del();
        res.status(204).json({statusMessage: "Account has been removed!"})
    }
    catch(error){
        next(error)
    }
})

module.exports = server;
