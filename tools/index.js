/***********************************************************
  /tools - index
***********************************************************/

module.exports = Object.fromEntries (
  [
    /// longhand ///
    'not',
    /// console[_x_] shorthand ///
    'cerror',
    'clog',
    'cwarn',
  ]
  .map ((name) => [ name, require (`./${name}`) ])
)
