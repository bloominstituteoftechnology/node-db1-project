const db = require("../../data/db-config")

const getAll = () => {
  // translates to `SELECT * FROM accounts;` in SQL
  return db("accounts")
}

const getById = id => {
  // translates to `SELECT * FROM accounts WHERE id = ? LIMIT 1;` in SQL
  return db("accounts")
    .where({ id })
    .first()
}

const create = async (account) => {
  // translates to `INSERT INTO accounts (name, budget) VALUES (?, ?);` in SQL
  const [id] = await db("accounts")
    .insert(account)

	const newAccount = await db("accounts")
    .where({ id })
    .first()

  return (id, newAccount)
}

const updateById = async (id, account) => {
  // translates to `UPDATE accounts SET name = ? AND budget = ? WHERE id = ?;` in SQL
  await db("accounts")
    .update(account)
    .where({ id })

	return await db("accounts")
    .where({ id })
    .first()
}

const deleteById = async (id) => {
  // translates to `DELETE FROM accounts WHERE id = ?;` in SQL
  return await db("accounts")
    .where({ id })
    .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
