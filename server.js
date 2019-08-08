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
server.post("/", async (req, res) => {
  const postData = req.body;
  try {
    const post = await db("accounts").insert(postData);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const count = await db("accounts")
      .where("id", "=", id)
      .update(changes);
    if (count) {
      res.status(200).json({ updated: count });
    } else {
      res.status(404).json({ message: "id not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
server.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db("accounts")
      .where({ id })
      .del();
    if (count) {
      res.status(200).json({ deleted: count });
    } else {
      res.status(404).json({ message: "ID not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server;
