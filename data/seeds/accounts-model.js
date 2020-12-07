const db = require('../dbConfig')

module.exports = {
    getAll() {
        return db('accounts')
    },
    getByID(id){
    return db('accounts').where('id,id').first()
    },
    create(account) {
        return db('accounts').insert(account)
            .then(([id]) => {
            return db('accounts').where('id', id).first()
        })
    },
    update(id, account) {
        return db('accounts').where('id',id).update(account)
    },
    delete(id) {
        return db('accounts').where('id', id).del()
    }
}