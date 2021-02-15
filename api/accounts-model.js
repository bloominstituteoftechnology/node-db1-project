const db = require('../data/dbConfig');

module.exports= {
    getAccounts(){
        return db('accounts')
    },

    getById(id) {
        return db('accounts').where('id', id).first()
    },

    insert(account) {
        return db('accounts').insert(account)
    },

    update(id, account) {
        return db('accounts').where('id',id).update(account)
    },

    delete(id) {
        return db('accounts').where("id", id).delete()
    }


}