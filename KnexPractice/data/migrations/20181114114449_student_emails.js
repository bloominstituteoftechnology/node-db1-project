exports.up = function(knex, Promise) {
  // makes the changes to the database
  return knex.schema.createTable('student_emails', function(tbl) {
    // make changes to the table using the tbl object passed as a parameter

    // primary key
    tbl.increments(); // generate and id field and make it autoincrement and the primary key

    // other fields
    tbl.string('email', 128);

    tbl
      .integer('student_id')
      .unsigned()
      .references('id')
      .inTable('students');
  });
};

exports.down = function(knex, Promise) {
  // undo the changes to the database (it's called rolling back changes)
  return knex.schema.dropTableIfExists('student_emails');
};
