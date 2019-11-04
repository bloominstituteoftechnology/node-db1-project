const server = require('./server.js');

const PORT = process.env.PORT || 4000;

// testing to make sure API was working correctly
server.get('/', (req, res) => {
  res.send('<h2>Hello from inside index.js!</h2>')
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});