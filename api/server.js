const { Router } = require("express");
const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());


server.get("/", async (req,res,next) => {
    try {
        const account = await db.select("*").from("accounts")
        res.json(account)
    } catch (err) {
        next(err)
    }
})

server.get("/:id", async (req,res,next) => {
    const {id} = req.params
    try {
        const [account] = await db
        .select("*")
        .from("accounts")
        .where({id})
        if (account) {
            res.json(account)
        } else {
            res.status(404).json({message: 'Could not find Account'})
        }
        
    } catch (err) {
        next(err)
    }
})

server.post("/", async(req,res,next) => {
    try {
        const payload = {
            name: req.params.name,
            budget: req.params.budget,
        }

        if(!payload.name || !payload.budget) {
            return res.status(400).json({
                message: "Needs Name and Budget"
            })
        } else {
        const post = await db("accounts").insert(payload)
        res.json(post)
        }

    } catch(err) {
        next(err)
    }
})

server.put("/:id", async (req,res,next) => {

    // const { id } = req.params
    // try {
    //     const payload = {
    //         name: req.params.name,
    //         budget: req.params.budget,
    //     }

    //     if(!payload.name || !payload.budget) {
    //         return res.status(400).json({
    //             message: "Needs Name and Budget"
    //         })
    //     } else {
    //     const post = await db("accounts").update(payload).where({id})
    //     res.json({updated: post})
    //     }

    // } catch(err) {
    //     next(err)
    // }

    try {
        const account = await db("accounts").update(req.body).where({id : req.params.id})
        res.json(account)
    } catch (err) {
        next(err)
    } /// the fuck did this work and the other didnt????
})

server.delete("/:id", async(req,res,next) => {
    try {
        const account = await db("accounts").where({id : req.params.id}).del()
        res.status(204).end()
    } catch(err) {
        next(err)
    }
})





module.exports = server;
