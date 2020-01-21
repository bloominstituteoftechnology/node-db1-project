const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// get all accounts
router.get('/', async (req, res, next) => {
  try {
    // translates to SELECT * FROM accounts;
    res.json(await db.select("*").from("accounts"))
  } catch (err) {
    next(err)
  }
});

// get account by id
router.get('/:id', async (req, res, next) => {
  try {
    // translate to SELECT * FROM accounts WHERE id = <some id>;
    res.json(await db.select("*").from("accounts").where("id", req.params.id))
  } catch (err) {
    next(err)
  }
});

// create new account
router.post('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }

    // translates to INSERT INTO accounts (name, budget) VALUES(<some value>, <some value>);
    const [id] = await db("accounts").insert(payload)
    res.json(await db("accounts").where("id", id).first())
  } catch (err) {
    next(err)
  }
});

// edit account
router.put('/:id', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }

    // translate to UPDATE accounts SET name = <some value> AND budget = <some value> WHERE id = <some id>;
    await db("accounts").where("id", req.params.id).update(payload)
    res.json(await db("accounts").where("id", req.params.id).first())
  } catch (err) {
    next(err)
  }
});

// delete account
router.delete('/:id', async (req, res, next) => {
  try {
    // translates to DELETE FROM accounts WHERE id = <some id>;
    await db("accounts").where("id", req.params.id).del()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
});

module.exports = router;
