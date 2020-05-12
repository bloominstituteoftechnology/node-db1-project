const db = require('./dbConfig.js');

module.exports = {
    find,
    findById,
    insert,
    update,
    nuke,
}

function find() {
    return db('accounts');
};

function findById (id) {
    return db('accounts')
             .where({ id: Number(id) });
};

function insert (account) {
return db('accounts')
        .insert(account, 'id')
        .then(ids => ({ id: ids[0]}));
}

function update (id, account)  {
    return db('accounts')
            .where ('id', Number(id))
            .update(account);
}

function nuke (id)  {
    return db('accounts')
    .where( 'id', Number(id))
    .del();
}