const express = require("express");

// database access using knex
const db = require("./dbConfig");

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ error: "Failed to get the list of accounts" });
    });
});

router.get("/:id", (req, res) => {
  

  getById(req.params.id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({ error: "account could not be collected" });
    });
});

router.post("/", (req, res) => {
    console.log(req.body)
  db("accounts")
    .insert(req.body, "id")
    .then(ids => {
      return getById(ids).then(added => {
        res.status(201).json(added);
      }).catch(error => {
        res.status(500).json({ error: "failed to add the account" })
      })
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to add the account" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("accounts")
    .where( id )
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to update the account" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where( id )
    .del()
    .then(count => {
      console.log("Delete Spell Critical Hit, IT WAS SUPER EFFECTIVE!!!!");
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "Delete Spell Missed!!!" });
    });
});

function getById(id) {
  return db("accounts")
    .where({ id })
    .first();
}


module.exports = router;
