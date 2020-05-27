const express = require("express");
const AccRouter = require("../Acct/account-router.js");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use("/api/Acct", AccRouter);

server.get("/",(req, res) => {
    // res.status(200).json({ api: "up" });
    res.send(`
        <h2> DB Project</h2>
        <h1> Welcome: to Lambda School DATA BASE  </h1>
    `)
});



module.exports = server;
