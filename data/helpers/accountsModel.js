const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db("accounts");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then(account => {
        if (account) {
          return mappers.actionToBody(acount);
        } else {
          return null;
        }
      });
  } else {
    return query.then(accounts => {
      return actions.map(account => mappers.actionToBody(account));
    });
  }
}

function insert(account) {
  return db("actions")
    .insert(account)
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("accounts")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("accounts")
    .where("id", id)
    .del();
}