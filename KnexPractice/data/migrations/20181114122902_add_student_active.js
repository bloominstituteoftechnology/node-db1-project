
exports.up = function(knex, Promise) {
    return knex.schema.table('students', tbl => {
      tbl.boolean('is_active');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('students', function(tbl) {
      tbl.dropColumn('is_active');
    });
  };