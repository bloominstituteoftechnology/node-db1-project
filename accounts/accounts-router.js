const express = require('express')
const db = require('../data/dbConfig')

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts")
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const account = await db
      .select("*")
      .from("accounts")
      .where("id", req.params.id)
      .limit(1)

    res.json(account)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }

    if (!payload.name || !payload.budget) {
      return res.status(400).json({
        message: "Need a name and a budget",
      })
    }

    const [id] = await db.insert(payload).into("accounts")
    const account = await db
      .first("*")
      .from("accounts")
      .where("id", id)

    res.status(201).json(account)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }

    if (!payload.name || !payload.budget) {
      return res.status(400).json({
        message: "Need a name and a budget",
      })
    }

    await db("accounts")
      .where("id", req.params.id)
      .update(payload)
    
    const account = await db
      .first("*")
      .from("accounts")
      .where("id", req.params.id)

    res.json(account)
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    await db("accounts").where("id", req.params.id).del()

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router