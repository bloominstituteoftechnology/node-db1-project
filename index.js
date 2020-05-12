const server = require("./api/server.js");
const accountsRoute = require('./accountsRoute');
const PORT = process.env.PORT || 5000;

server.get('/', (req, res) => {
    res.send('<h2>Node db 1</h2>')
})

server.use('/accounts', accountsRoute);






server.listen(PORT, () => {
  console.log(`API running on port ${PORT} `);
});


