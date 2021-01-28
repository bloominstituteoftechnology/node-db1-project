const db = require('../../data/dbConfig.js')

module.exports = {
    get,
    getByID,
    create,
    update,
    remove,
}

async function get() {
    const sql = await db('accounts').toString();
    console.log(sql);


    const accounts = await db('accounts');
    return accounts;
}

async function getByID(id) {
    const accounts = await db.first('*').from('accounts').where({id})

    return accounts
}

async function create(data) {
    const [accountId] = await db.insert(data).into('accounts');
    const accounts = await getByID(accountId);
    return accounts;
}

async function update(id, changes) {
    const accounts = await db('accounts').where({id}).update(changes)
    return accounts
}

async function remove(id) {
    const count = await db.del().from('posts').where({id});
    return count
}