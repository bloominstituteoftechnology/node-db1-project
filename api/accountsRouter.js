const express = require("express")
// const db = require("../data/dbConfig") // unsure if this is correct

// database access using knex
const knex =  require('../data/dbConfig.js');
const router = express.Router()




// router.get("/", async (req, res, next) => {
//     try {
//         //translates to 'SELECT * FROM messages;'
//         const messages = await db.select("*").from("messages")
//         
//         res.json(messages)
//     } catch (err) {
//         next(err)
//     }
// })

// router.get("/:id", (req, res, next) => {

// })

router.post("/", async (req, res, next) => {
    const accountData = req.body;

    try {
        const totalAccounts = await knew('accounts').insert('accountData');
        res.status(201).json(totalAccounts);

    } catch (err) {
        console.log("error: ", err);
        next(err)
    }
})

// router.put("/:id", (req, res, next) => {

// })

// router.delete("/:id", (req, res, next) => {

// })

