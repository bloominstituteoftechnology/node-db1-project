/***********************************************************
  ~/accounts - index
***********************************************************/

module.exports = Object.fromEntries (
  [
    'database',
    'router',
  ]
  .map ((name) => [ name, require (`./${name}`) ])
)
