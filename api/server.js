const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    const sql = db('*').from('accounts').toString();
    console.log(sql)
    db('accounts')
        .then(account => {
            res.json(account);
        })
        .catch(err => {
            res.status(500).json({ message: 'error getting accounts', error: err })
        })
});

server.get('/:id', async (req, res) => {
    const { id } = req.params;// Because we want to selct a specifi ID
    try {
        //const response = await db('accounts').where('id', id).select('*');
        const [account] = await db('accounts').where({ id });
        if (account) {
            res.json(account)
        } else {
            res.status(404).json({ message: 'bad id' });
        }
        // see image in slack about {id}
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});

server.post('/', async (req, res) => {

    const newPost = req.body;
    try {
        //const sql = db('accounts').insert(newPost).toString();
        // console.log(sql)
        const post = await db('accounts').insert(newPost);
        res.status(201).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json()
    }

});

server.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const count = await db('accounts').update(changes).where({ id });

        if (count) {
            res.json({ updated: count })
        } else {
            res.status(500).json({ message: 'invalid ID' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error uploading record" })
    }

});

server.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const count = await db('accounts').where({ id }).del();

        if (count) {
            res.json({ deleted: count });
        } else {
            res.status(404).json({ message: 'Invalid ID' })

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error uploading record" })
    }
});
// server.get("/", (req, res) => {
//     db("accounts")
//         .then((accounts) => {
//             res.json(accounts);
//         })
//         .catch((err) => {
//             res.status(500).json({ message: "Error fetching accounts!", err });
//         });
// });


module.exports = server;
