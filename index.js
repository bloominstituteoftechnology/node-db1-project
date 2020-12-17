const server = require("./api/server.js");

const accountsRouter = require('./api/accounts/accountsRouter');

/* ROUTERS */
server.use('/api/accounts', accountsRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
