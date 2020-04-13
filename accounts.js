const express = require("express");
const db = require("./data/dbConfig");
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
    .where({ id: req.params.id })
    .then((account) => {
      res.status(200).json({ data: account });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  const postAccount = req.body;
  db("accounts")
    .insert(postAccount, "id")
    .then((ids) => {
      const id = ids[0];
      db("accounts")
        .where({ id })
        .first()
        .then((account) => {
          res.status(200).json({ data: account });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
