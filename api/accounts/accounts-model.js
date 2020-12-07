const db = require ('../../data/dbConfig')

module.exports = {
    getAll() {
        return db('accounts');
    },
    getById(id) {
        return db('accounts').where('id', id).first()
    },
    create(account) {
        return db('accounts').insert(account)
    },
    update(id, account) {
        return db('accounts').where('id', id).update(account)
        .then(() => {
            return db('accounts').where('id', id)
        })
    },
    delete(id) {
        return db('accounts').where('id', id).del()
    }
}