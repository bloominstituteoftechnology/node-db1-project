const db = require('../../data/db-config');

const getAll = async () => {
	// !! DO YOUR MAGIC
	console.log(await db('accounts').toString());
	return db('accounts');
};

const getById = (id) => {
	// !! DO YOUR MAGIC
	const account = db.first('*').from('accounts').where({ id });
	return account;
};

const create = (account) => {
	// !! DO YOUR MAGIC
	const newAccount = db('accounts').insert(account);
	return newAccount;
};

const updateById = async (id, account) => {
	// !! DO YOUR MAGIC
	return await db('accounts').update(account).where({ id });
};

const deleteById = async (id) => {
	// !! DO YOUR MAGIC
	return await db('accounts').del().where({ id });
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};
