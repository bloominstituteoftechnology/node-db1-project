exports.seed = function(knex, Promise) {
  // we want to remove all data before seeding
  // truncate will reset the primary key each time
  return knex('accounts').truncate()
    .then(function () {
      // add data into insert
      return knex('accounts').insert([
        { name: 'Stephenson', budget: 10000 },
        { name: 'Richie Rich', budget: 40400 },
        { name: 'Scrooge McDuck', budget: 80800 },
        { name: 'Daddy Warbucks', budget: 20200 },
        { name: 'Jed Clampet', budget: 3500 },
        { name: 'Oliver Twist', budget: 17 },
        


      ]);
    });
};

