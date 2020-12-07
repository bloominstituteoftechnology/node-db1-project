const db = require('../../data/dbConfig');


module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
};

function getAll() {
    return db('accounts');
}

function getById(id) {
    return db('accounts').where('id', id).first();
}

function insert(post) {
    db('posts').insert(post)
        .then(([id]) => {
            return db('posts').where('id', id).first();
        })
}

function update(id, changes) {
    
}

function remove(id) {

}

