/**********************************************************/

require ('dotenv').config ()
const { clog } = require ('./tools')

const server = require ('./server.js')
const port = process.env.PORT || 5555

server.listen (port, () => {
  clog (`it's alive!`)
  clog (`\n>>> listening on port ${port} <<<\n`)
})

/**************************************/
