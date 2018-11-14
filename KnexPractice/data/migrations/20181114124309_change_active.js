exports.up = function(knex, Promise) {
    return knex.schema.table('students', tbl => {
      tbl.renameColumn('is_active' ,'active');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('students', function(tbl) {
      tbl.dropColumn('active');
    });
  };
