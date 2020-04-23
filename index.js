const express = require("express");
const accountsRouter = require("./data/seeds/accounts-router");
const db = require("./data/dbConfig.js");
const server = express();
const PORT = process.env.PORT || 4040;

server.use(express.json());
server.use("/accounts", accountsRouter);
server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});