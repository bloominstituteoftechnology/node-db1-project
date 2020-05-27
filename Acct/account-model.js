const db = require("../data/dbConfig.js"); 

module.exports = {
    find,
    findById
}

function find () {
    return db("accounts")
      .limit(3)
}

function findById (id) {
    return db("accounts")
      .where({id})
      .first()
}
