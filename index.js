const server = require("./api/server.js");

const PORT = process.env.PORT || 7777;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
