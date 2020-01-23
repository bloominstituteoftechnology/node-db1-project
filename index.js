const server = require('./server.js');

const PORT = process.env.PORT || 4000;

// handler of errors here
server.use((error, req, res, next) =>{
  console.log(error);
  res.status(500).json({errorMessage: 'Oh NOOoo, something went wrong'})
})
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});