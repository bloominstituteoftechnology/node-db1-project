
exports.up = function (knex, Promise) {
  return knex.schema.createTable ('accounts', (table) => {
    table.increments ()
    table.string ('name')
      .notNullable ()
      .unique ()
    table.decimal ('budget')
      .notNullable ()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists ('accounts')
}
