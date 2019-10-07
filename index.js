const server = require('./server.js');
const accountsRoutes = require('./routes/accounts');

server.get('/', async (req, res) => {
    let accounts = await db('accounts');
    res.json(accounts);
});

server.use('/accounts', accountsRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
