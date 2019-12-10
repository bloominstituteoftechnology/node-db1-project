const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();
const knex = require("../data/dbConfig"); 


router.get("/", (req, res) => {

  knex
    .select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the accounts" });
    });
});

router.get("/:id", (req, res) => {
  // select * from accounts where id = req.params.id
  knex
    .select("*")
    .from("accounts")
    // .where("id", "=", req.params.id)
    .where({ id: req.params.id })
    .first() // equivalent to accounts[0]
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the account" });
    });
});

router.post("/", (req, res) => {
  // insert into () values ()
  const postData = req.body;

  // please validate postData before calling the database
  // knex.insert(postData).into('accounts')
  // second argument "id") will show a warning on console when using SQLite
  // it's there for the future (when we move to MySQL or Postgres)
  knex("accounts")
    .insert(postData, "id")
    .then(ids => {
      // returns and array of one element, the id of the last record inserted
      const id = ids[0];

      return knex("accounts")
        .select("id", "title", "contents")
        .where({ id })
        .first()
        .then(post => {
          res.status(201).json(account);
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error adding the post"
      });
    });
});


// router.post("/", (req, res) => {
//   // insert into () values ()
//   const postData = req.body;

//   knex("accounts")
//     .insert(postData, "id")
//     .then(ids => {
//       // returns and array of one element, the id of the last record inserted
//       const id = ids[0];

//       return knex("accounts")
//         .select("id", "name", "budget")
//         .where({ id })
//         .first()
//         .then(post => {
//           res.status(201).json(account);
//         });
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({
//         errorMessage: "Error adding the account"
//       });
//     });
// });

// PUT /api/accounts/:id endpoint to Update an account -
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // validate the data
  knex("accounts")
    .where({ id: req.params.id }) // ALWAYS FILTER ON UPDATE (AND DELETE)
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error updating the account"
      });
    });
});

router.delete("/:id", (req, res) => {
  knex("posts")
    .where({ id: req.params.id }) // ALWAYS FILTER ON UPDATE (AND DELETE)
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) removed` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error removing the account"
      });
    });
});



module.exports = router;



