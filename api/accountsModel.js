const db = require("../data/dbConfig");

module.exports = {
    getAll(){
        return db("accounts")
    },
    getByID(id){
        return db("accounts").where("id", id).first()
    },
    create(account){
        return db("accounts").insert(account)
    },
    update(id, account){
        return db("accounts").where("id", id).update(account)
    },
    delete(id){
        return db("accounts").where("id", id).del()
    }
}