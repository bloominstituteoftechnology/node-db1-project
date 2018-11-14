exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('student_emails')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('student_emails').insert([
        { student_id: 1, email: 'sam@shire.com' },
        { student_id: 1, email: 'samg@shire.com' },
        { student_id: 2, email: 'frodo@shire.com' },
        { student_id: 3, email: 'peregrin@shire.com' },
        { student_id: 4, email: 'meriadoc@shire.com' },
      ]);
    });
};
