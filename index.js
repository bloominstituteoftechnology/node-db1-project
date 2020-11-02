const server = require("./api/server.js"); // import server
const dbConfig = require("./data/dbConfig.js");

const PORT = process.env.PORT || 5000; //create port

const accountsRouter = require("./Router/accounts-router"); //import router

server.use("/accounts", accountsRouter); //create root for router

server.get("/", (req, res) => {
  res.status(200).json({ Data: "Running" }); //test endpoint
});

server.listen(PORT, () => {
  //listen for changes to the server
  console.log(`\n== API running on port ${PORT} ==\n`);
});
