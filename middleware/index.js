/***********************************************************
  /middleware - index
***********************************************************/

module.exports = Object.fromEntries (
  [
    'respondWithError',
  ]
  .map ((name) => [ name, require (`./${name}`) ])
)
