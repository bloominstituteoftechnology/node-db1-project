
const db = require("../data/dbConfig.js");

module.exports = {
getAll(){
    return db('budget')
},
getById(id){
    return db('budget').where({id}).first()
},
async create(budget) {
    const [id] = await db("budget").insert(budget)
    return db('budget').where({id}).first()
},
async update(id, changes) {
    const count = await db("budget").where({id}).update(changes)
    if (count){
        return db("budget").where({id}).first()
    }else{
        return Promise.resolve(null)
    }
},
async delete(id) {
    const item = await db("budget").where({id}).first()
    if (!item) return Promise.resolve(null)
    await db("budget").where({id}).del()
    return Promise.resolve(item)
}
}