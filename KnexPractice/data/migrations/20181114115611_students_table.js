
exports.up = function(knex, Promise) {
  //makes the changes to the DB
  return knex.schema.createTable('students', function(tbl) {
      //make changes to the table use the tbl object

      //primary key
      tbl.increments(); // generate an id field and make it autoincrament 

      //other fields
      tbl.string('name', 128)
      tbl.string('email', 256)

      tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  //undo the changes to the DB(rollback)
  return knex.schema.dropTableIfExists('students')
};
