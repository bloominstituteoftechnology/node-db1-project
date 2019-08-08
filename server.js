const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

// GET ALL
server.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ID

// POST

// PUT

// DELETE

module.exports = server;
