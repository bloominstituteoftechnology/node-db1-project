const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();


//GET accounts

router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

//GET account by ID

router.get("/:id", async (req, res, next) => {
  try {
    const account = await db("accounts")
    .first()
    .from("accounts")
    .where("id", req.params,id);
    res.json(account);
  } catch (err) {
    next (err);

  }
});

//POST - create account

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };

    const [id] = await db("accounts").insert(payload);
    const account = await db("accounts").where("id", id).first();
    res.json(account);
  } catch (err) {
    next(err);
  }
});

//PUT  -  UPDATE

router.put('/', async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    await db("accounts").where("id", req.params.id).update(payload);
    const update = await db("accounts").where("id", req, res, next).first();
    res.json(update);
  } catch (err) {
    next (err);
  }
});

//DELETE

router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts").where("id", req.params.id).del();
    res.status(204).end();
  } catch (err) {
    next (err);
    }
});

module.exports = router;
