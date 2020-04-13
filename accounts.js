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

router.put("/:id", (req, res) => {
  const update = req.body;
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(update)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "updated successfully" });
      } else {
        res.status(404).json({ message: "Unsuccessful" });
      }
    });
});

router.delete("/:id", (req, res) => {
    db("accounts")
      .where("id", "=", req.params.id)
      .del()
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "error deleting the account" });
      });
  });
  
module.exports = router;
