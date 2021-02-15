const db = require("../../data/dbConfig");

const getAll = () => {
    return db("accounts");
};
const getByID = async (id) => {
    const account = await db.first("*").from("accounts").where({ id });

    return account;
};
const create = async (account) => {
    const [accountId] = await db.insert(account).into("accounts");
    const newAccount = await getByID(accountId);
    return newAccount;
};

const update = async (id, changes) => {
    const accounts = await db("accounts").where({ id }).update(changes);
    return accounts;
};

const remove = async (id) => {
    const count = await db.del().from("accounts").where({ id });
    return count;
};

module.exports = {
    getAll,
    getByID,
    create,
    update,
    remove,
};
