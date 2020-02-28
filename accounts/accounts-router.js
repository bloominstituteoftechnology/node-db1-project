const router = require("express").Router();

const knex = require("../data/dbConfig.js");

// GET A LIST OF ALL ACCOUNTS
router.get("/", (req, res) => {
 knex
  .select("*")
  .from("accounts")
  .then(accounts => {
   res.status(200).json(accounts);
  })
  .catch(err => {
   console.log(err);
   res.status(500).json({
    Error: "There was an error retrieving accounts from the database."
   });
  });
});

// GET ACCOUNT BY ID
router.get("/:id", (req, res) => {
 knex("accounts")
  .where({ id: req.params.id })
  .first()
  .then(account => {
   if (account) {
    res.status(200).json({ account });
   } else {
    res.status(404).json({ message: "There were no accounts found." });
   }
  })
  .catch(err => {
   console.log(err);
   res.status(500).json({ Error: "There was a problem finding the account" });
  });
});

// POST A NEW ACCOUNT
router.post("/", (req, res) => {
 if (!req.body.name || !req.body.budget) {
  res
   .status(400)
   .json({ Error: "Please include a name and budget in your request." });
 } else {
  knex
   .insert(req.body)
   .into("accounts")
   .then(account => {
    res.status(201).json(account);
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({ Error: "There was an error creating the account." });
   });
 }
});

// UPDATE AN ACCOUNT BY ID
router.put("/:id", (req, res) => {
 knex("accounts")
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
   if (count) {
    res.status(200).json({ message: `Updated ${count} records.` });
   } else {
    res.status(404).json({ message: "There were no matches found to update." });
   }
  })
  .catch(err => {
   console.log(err);
   res.status(500).json({ Error: "There was a problem updating the account" });
  });
});

//DELETE AN ACCOUNT BY ID
router.delete("/:id", (req, res) => {
 knex("accounts")
  .where({ id: req.params.id })
  .delete()
  .then(count => {
   if (count) {
    res.status(200).json({ message: `${count} rows were deleted.` });
   } else {
    res.status(404).json({
     message: "Nothing was deleted. Check to make sure the ID is valid."
    });
   }
  })
  .catch(err => {
   console.log(err);
   res.status(500).json({ Error: "There was an error deleting the account." });
  });
});

module.exports = router;
