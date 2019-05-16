// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/accounts.db3'
    },
    useNullAsDefault: true
  },
};
