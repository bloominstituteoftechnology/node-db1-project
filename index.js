const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

// added error handling

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({error: "Something went wrong"});
});