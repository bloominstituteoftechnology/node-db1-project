const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// get all accounts
server.get('/accounts', async (req, res, next) => {
    try { // SELECT * FROM "accounts"
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    } catch (error) {
        next(error)
    }
});

// get single account
server.get('/accounts/:id', async (req, res, next) => {
    try { // SELECT '*' FROM "accounts" WHERE "id" = "req.params.id" LIMIT 1
        const account = await db.select("*").from("accounts").where("id", req.params.id).limit(1)
        res.json(account)
    } catch (error) {
        next(error)
    }
});

// post new account
server.post('/accounts', async (req, res, next) => {
    try { // INSERT INTO "accounts" ('name', 'budget') VALUES (req.body.name, req.body.budget)
        const id = await db.insert({
            name: req.body.name,
            budget: req.body.budget
        }).into("accounts")

        // SELECT * FROM "accounts" WHERE "id" = "req.params.id" LIMIT 1
        const account = await db("accounts").where("id", id).limit(1)
        // NOTE: could also use .first() instead of .limit(1)
        // const account = await db("accounts").where("id", id).first()
        res.status(201).json(account)
    } catch (error) {
        next(error)
    }
})


module.exports = server;
