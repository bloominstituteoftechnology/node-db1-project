/**************************************/

module.exports = Object.fromEntries (
  [
    'kvPairs',
    'message',
    'error',
  ]
  .map ((name) => [ name, require (`./${name}`) ])
)
