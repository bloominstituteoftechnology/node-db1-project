/**************************************/

module.exports = Object.fromEntries (
  []
  .map ((name) => [ name, require (`./${name}`) ])
)
