/**************************************/

module.exports = Object.fromEntries (
  [
    'messages',
    'errors',
  ]
  .map ((name) => [ name, require (`./${name}`) ])
)
