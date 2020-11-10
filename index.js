const server = require("./api/server.js");

const PORT = process.env.PORT || 4000;
const accountsRouter = require("./Router/accounts-router");

server.use("/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ Data: "Running" });
});

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
