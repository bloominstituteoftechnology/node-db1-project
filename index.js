const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Kicking back and having a cold one on port ${PORT}...`);
});