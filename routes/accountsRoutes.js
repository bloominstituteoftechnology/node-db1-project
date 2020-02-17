const express = require("express");
const router = express.Router();
const Db = require("../data/dbConfig");

//  GET =======>

router.get("/", (req, res) => {
  Db.get()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not retrieve data from database" });
    });
});



