var knex = require("knex");
var knexConfig = require("../knexfile.js");
var db = knex(knexConfig.development);

module.exports = {
    findById,
    find,
}
function find(){
    return db("accounts");
}
function findById(id){
    return db("accounts").where({id:Number(id)});
}