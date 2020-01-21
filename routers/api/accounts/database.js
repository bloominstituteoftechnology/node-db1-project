/***********************************************************
  ~/accounts - database
***********************************************************/

const db = require ('../../../data/db-config')

/***************************************
  MAIN
***************************************/

const name = 'accounts'

const getAll = async () => {
  const records = await (
    db (name)
  )

  return records
}

const get = async (id) => {
  const [ record ] = await (
    db (name)
    .where ({ id })
  )

  return record
}

const set = async (id, value) => {
  await (
    db (name)
    .where ({ id })
    .update (value)
  )

  const record = await get (id)

  return record
}

const push = async (value) => {
  const [ id ] = await (
    db (name)
    .insert (value)
  )

  const record = await get (id)

  return record
}

const pull = async (id) => {
  const record = await get (id)

  if (record) {
    await db (name)
    .where ({ id })
    .delete ()
  }

  return record
}

/**************************************/

module.exports = {
  getAll,
  get,
  set,
  push,
  pull,
}
