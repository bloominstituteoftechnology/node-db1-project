const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/accounts', async (req, res, next) => {
    try { // SELECT * FROM "accounts"
        const accounts = await db.select("*").from("accounts")
        res.json(accounts)
    } catch (error) {
        next(error)
    }
  });

module.exports = server;
