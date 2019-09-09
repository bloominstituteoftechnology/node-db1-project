const PORT = process.env.PORT || 4000;
var express = require("express");
var server = express();
var accountsRouter = require("./accountsRouter.js");
server.use(express.json());
server.use("/api/accounts", accountsRouter);


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});