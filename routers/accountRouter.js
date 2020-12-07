const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

const Accounts = {
  getAll() {
    // return db.select().from('accounts')
    // return db.select('*').from('accounts')
    // return db.select('id', 'title', 'contents').from('accounts')
    return db("accounts"); // short hand to do the same as above
  },
  getById(id) {
    // return db('accounts').where({ id }).first()
    return db("accounts").where({ id });
  },
  create(account) {
    return db("accounts").insert(account);
  },
  update(id, account) {
    return db("accounts").where({ id }).update(account);
  },
  delete(id) {
    return db("accounts").where({ id }).del();
  },
};
// db helpers end

router.get("/", (req, res) => {
  Accounts.getAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      // res.json({ message: 'oops, something went wrong' }) // production
      res.json({ error: error.message }); // development
    });
});

router.get("/:id", (req, res) => {
  Accounts.getById(req.params.id)
    .then((data) => {
      // if empty dataset, do something different
      if (!data.length) {
        res.json({ message: "no account with said id" });
      } else {
        res.json(data[0]);
      }
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

router.post("/", (req, res) => {
  Accounts.create(req.body)
    .then(([id]) => {
      return Accounts.getById(id).first();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error.message });
    });
});

router.put("/:id", async (req, res) => {
  try {
    await Accounts.update(req.params.id, req.body);
    const updatedPost = await Accounts.getById(req.params.id).first();
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRowsNumber = await Accounts.delete(req.params.id);
    if (!deletedRowsNumber) {
      res.json({ message: "no account with given id" });
    } else {
      res.json({ message: "account deleted successfully" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
