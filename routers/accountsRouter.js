
const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where("id", "=", req.params.id)
    .then((accountInfo) => {
      res.status(200).json({ data: accountInfo });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const newData = req.body;
  console.log(newData);
  db("accounts")
    .insert(newData, "id")
    .then((ids) => {
      res.status(201).json({ data: ids });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then((count) => {
      res
        .status(200)
        .json({ data: count })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      res.status(202).json({ data: count });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;