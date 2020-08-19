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
    try { // SELECT '*' FROM "accounts" WHERE "id" = "req.params.id"
        const account = await db.select("*").from("accounts").where("id", req.params.id).limit(1)
        res.json(account)
    } catch (error) {
        next(error)
    }
});


module.exports = server;
