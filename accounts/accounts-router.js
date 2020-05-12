const express = require("express");

// database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("get");
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ messsage: error.message });
    });
});

function isValidPost(post) {
  return Boolean(post.title && post.contents);
}

module.exports = router;
