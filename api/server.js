const express = require("express")

const db = require("../data/dbConfig.js")

const server = express()

server.get("/", (req, res) => {
  const allAccounts = db("*").from("accounts").toString()
  console.log(allAccounts)
  db("accounts")
    .then((account) => {
      res.json(account)
    })
    .catch((error) => {
      res.status(500).json({ message: error.message })
    })
})

server.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const [account] = await db("accounts").where({ id })
    if (account) {
      res.json(account)
    } else {
      res.status(404).json({ message: "bad id" })
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

server.post("/", async (req, res) => {
  const newPost = req.body
  try {
    const post = await db("accounts").insert(newPost)
    res.status(201).json(post)
  } catch (error) {
    res.json({ message: error.message })
  }
});

server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedAccounts = req.body
  try {
    const count = await db("accounts").update(updatedAccounts).where({ id })

    if (count) {
      res.json({ updated: count })
    } else {
      res.status(500).json({ message: "does not exist" })
    }
  } catch (error) {
    console.log(err)
    res.status(500).json({ message: error.message })
  }
});

server.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const count = await db("accounts").where({ id }).del()

    if (count) {
      res.json({ deleted: count })
    } else {
      res.status(404).json({ message: "does not exist" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
})

server.use(express.json())

module.exports = server
