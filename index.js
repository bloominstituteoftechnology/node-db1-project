const server = require("./api/server.js");
const accountsRouter = require("./accounts/accounts-router")

const PORT = process.env.PORT || 5000;

server.use("/", accountsRouter)

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
