const db = require('../../data/dbConfig'); 

module.exports = {
    getAll() {
        return db('accounts'); 
    }, 
    create(account) {
        return db('accounts').insert(account)
        .then(([id]) => {
            return db('posts').where('id', id).first()
          })
    }, 
    getByName(name) {
        return db('accounts').where('name', name).first(); 
    }, 
    getById(id){
        return db('accounts').where('id', id).first(); 
    }, 
    update(id, account){
        return db('accounts').where('id', id).update(account); 
    }, 
    delete(id){
        return db('accounts').where('id', id).del(); 
    }
}