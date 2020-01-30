const express = require("express");

const db = require("./data/dbConfig");
const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const accounts = await db("accounts");
//     res.status(200).json(accounts);
//   } catch (err) {
//     res.status(500).json({ message: "error retrieving accounts" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts")
      .limit(5)
      .orderBy("id", "desc");
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: "error retrieving accounts" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const account = await db("accounts").where("id", id);
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ message: "error retrieving the account" });
  }
});

router.post("/", async (req, res) => {
  try {
    const account = await db("accounts").insert(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: "error retrieving the account" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rowsUpdated = await db("accounts")
      .where("id", id)
      .update(req.body);
    res.status(200).json({ "Rows Updated": rowsUpdated });
  } catch (err) {
    res.status(500).json({ message: "error retrieving the account" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(200).json({ "row deleted": rowsDeleted });
  } catch (err) {
    res.status(500).json({ message: "error retrieving the account" });
  }
});
module.exports = router;

/* stretch
 distinct city:
 select distinct city from customers;

 Find all suppliers who have names longer than 20 characters. Returns 11 records:
 select * from suppliers where length(suppliername) > 20;

Add a query string option to your GET /api/accounts endpoint. The query string may contain limit, sortby and sortdir keys. If these keys are provided, use these values to limit and sort the accounts which are selected from the database. Reference the docs for sorting and limiting in knex.


*/
