const server = require('./server.js');
const router = require('./routers/router');
const PORT = process.env.PORT || 4000;

server.use('/api/', router);



server.get('/', (req, res) => {
    res.send(`<h2>Let's Do Some Database!</h2>`);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});