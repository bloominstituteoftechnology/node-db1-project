/***********************************************************
  ~/api - index
***********************************************************/

module.exports = Object.fromEntries (
  [
    'router',
  ]
  .map ((name) => [ name, require (`./${name}`) ])
)
