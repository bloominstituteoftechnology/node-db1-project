// const express = require('express');

// const knex = require("../data/dbConfig");

// const router = express.Router();

// router.get('/', (req, res) => {
//     knex
//         .select('*')
//         .from('accounts')
//         .then(posts => {
//             res.status(200).json(posts);
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({ errorMessage: "Error getting the accounts"});
//         });
// });

// router.get("/:id", (req, res) => {
//     knex
//       .select("*")
//       .from("accounts")
//       .where({ id: req.params.id })
//       .first()
//       .then(post => {
//         res.status(200).json(post);
//       })
//       .catch(error => {
//         console.log(error);
//         res.status(500).json({ errorMessage: "Error getting the accounts" });
//       });
//   });

