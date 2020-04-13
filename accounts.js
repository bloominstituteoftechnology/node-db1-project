const express = require("express");
const db = require("./data/dbConfig");
const router = express.Router();

router.get("/", (req,res) => {
    db.select("*")
    .from("accounts")
    .then((accounts) => {
        res.status(200).json({data: accounts });
    })
    .catch((error) => {
        res.status(500).json({error: error.message})
    })
})

module.exports = router;