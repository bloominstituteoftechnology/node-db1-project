module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/budget.db3',
    },
    useNullAsDefault: true,
  },
};
