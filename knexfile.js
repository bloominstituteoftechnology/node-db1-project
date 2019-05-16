// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/budget.sqlite3'
    },
    useNullAsDefault: true
  },
};
