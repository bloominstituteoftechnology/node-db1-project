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
server.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [account] = await db("accounts").where({ id });
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "missing post ID" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST

// PUT

// DELETE

module.exports = server;
