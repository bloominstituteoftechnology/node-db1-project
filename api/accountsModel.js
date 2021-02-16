const db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  post,
  put,
  remove,
};

function get() {
  return db("accounts");
}
function getById(id) {
  return db("accounts").where("id", id).first();
}
function post(post) {
  return db("accounts")
    .insert(post)
    .then(([id]) => {
      return db("accounts").where("id", id).first();
    });
}
function put(id, changes) {
  const POSTID = id;
  return db("accounts")
    .where("id", id)
    .update(changes)
    .then(() => {
      return db("accounts").where("id", POSTID).first();
    });
}
function remove(id) {
  return db("accounts")
    .where("id", id)
    .del()
    .then(() => {
      return db("accounts");
    });
}
