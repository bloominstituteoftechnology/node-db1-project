const db = require('../../data/dbConfig');


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};

function getAll() {
    return db('accounts');
}

function getById(id) {
    return db('accounts').where('id', id).first();
}

async function create(post) {
    // return db('accounts').insert(post)
    //     .then(([id]) => {
    //         return db('accounts').where('id', id).first();
    //     })

    const newId = await db('accounts').insert(post);
    return db('accounts').where('id', newId).first();
}

async function update(id, changes) {
    // return db('accounts').where('id', id).update(changes)
    //     .then(() => {
    //         return db('accounts').where('id', id)
    //     })

    await db('accounts').where('id', id).update(changes);
    return db('accounts').where('id', id);

}

function remove(id) {
    return db('accounts').where('id', id).del();
}

