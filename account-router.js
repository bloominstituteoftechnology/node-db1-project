const express = require('express')
const db = require("./data/dbConfig")

const router = express.Router()

router.get( "/", async (req, res, next) => {
    try {
       const accounts = await db.select("*").from("accounts")
       res.json(accounts)
    } catch (err){ 
        next(err)
    }    
})

router.get( "/:id", async (req, res, next) => {
    try {
        const accounts = await db.first("*").from("accounts").where("id", req.params.id)
        // const accounts = await db.select("*").from("accounts").where("id", req.params.id).limit(1)
        // instead of select and limit (returns array) we can use first (returns object)
        res.json(accounts)
    } catch (err){ 
        next(err)
    }
})

router.post( "/", async (req, res, next) => {
    try {
        const payload = {
            name : req.body.name,
            budget : req.body.budget
        }
        // await db.insert(payload).into("accounts")
       const [id] = await db("accounts").insert(payload)
       const newAccount = await db("accounts").where("id", id).first()
       res.json(newAccount)
    } catch (err){ 
        next(err)
    }
})

router.put( "/:id", async (req, res, next) => {
    try {
        const payload = {
            name : req.body.name,
            budget : req.body.budget
        }
             await db("accounts").where("id", req.params.id).update(payload)
            const accounts = await db("accounts").where("id", req.params.id).first()
            res.json(accounts)
    } catch (err){ 
        next(err)
    }
})

router.delete( "/:id", async (req, res, next) => {
    try {
        await db("accounts").where("id", req.params.id).del()
        res.status(204).end()
    } catch (err){ 
        next(err)
    }
})


module.exports = router