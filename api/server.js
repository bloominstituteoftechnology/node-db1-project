const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());


function get() {
    return db('accounts')
}

function getById(id) {
    return db('accounts').where({id})
}

function insertAccount(account) {
    return db('accounts').insert(account).then(ids => {
        return getById(ids[0])
    })
}

function update(id, account) {
    return db('accounts').where({id}).update(account).then(() => getById(id))
}

async function remove(id) {
    const account = await getById(id)
    return db('accounts').where({id}).del().then(count => {
        if (count > 0) {
            return account
        }
        return
    })
}

async function query(limit=undefined, sortBy='ASC') {
    // limit, sortby,
    if (limit === undefined) {
        const count = await db('accounts').count()    
    }
    return db('accounts').limit(limit).sortBy(sortBy)
}

server.get('/query', async (req, res) => {
    const limit = req.query.limit
    const sortBy = req.query.sortBy
    try {
        const accounts = await query(limit, sortBy)
        if (accounts) { return res.status(201).json(accounts) }
        res.status(400).json({ message: 'CRAP!' })
    } catch(e) {
        res.status(500).json({ message: 'What the Hell!' })
    }
})

server.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const account = await remove(id)
        if (account) { return res.status(200).json(account) }
        res.status(400).json({ message: 'CRAP!' })
    } catch(e) {
        res.status(500).json({ message: 'WTF' })
    }
})


server.put('/:id', async (req, res) => {
    const id = req.params.id
    const body = req.body
    try {
        const account = await update(id, body)
        if (account && account.length !== 0) { return res.status(200).json(account) }
        res.status(400).json({ message: 'CRAP!' })
    } catch(e) {
        res.status(500).json({ message: 'WTF' })
    }
})


server.post('/', async (req, res) => {
    const body = req.body
    try {
        const account = await insertAccount(body)
        if (account) { return res.status(200).json(account) }
        res.status(400).json({ message: 'CRAP!' })
    } catch(e) {
        res.status(500).json({ message: 'WTF' })
    }
})


server.get('/', async (req, res) => {
    try {
        const accounts = await get()
        if (accounts) { return res.status(200).json(accounts) }
        res.status(400).json({ message: 'CRAP!' })
    } catch(e) {
        res.status(500).json({ message: 'WTF' })
    }
})

server.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const account = await getById(id)
        if (account) { return res.status(200).json(account) }
        res.status(400).json({ message: 'CRAP!' })
    } catch(e) {
        res.status(500).json({ message: 'WTF' })
    }
})

module.exports = server;
