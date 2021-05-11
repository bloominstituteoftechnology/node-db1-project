const db = require("../../data/db-config");

const getAll = () => {
	return db("accounts");
};

const getById = (id) => {
	return db("accounts").where({ id }).first();
};

const create = async (account) => {
	return getById((await db("accounts").insert(account))[0]);
};

const updateById = async (id, account) => {
	await db("accounts").where({ id }).update(account);
	return getById(id);
};

const deleteById = async (id) => {
	const deletedPost = await getById(id);
	await db("accounts").where({ id }).del();
	return deletedPost;
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};
