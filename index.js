const server = require('./server.js');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

  server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
      message: "something went wrong"
    });

});