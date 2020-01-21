/***********************************************************
  server
***********************************************************/

/// tools ///
const express = require ('express')
const helmet = require ('helmet')
const morgan = require ('morgan')

const {
  respondWithError,
} = require ('./middleware')

/***************************************
  setup server
***************************************/

const server = express ()

/// wares ///
server.use ([
  helmet (),
  morgan ('dev'),
])

/// routers ///
const subs = [ 'api' ]
subs.forEach ((sub) => {
  server.use (
    `/${sub}`,
    require (`./routers/${sub}`).router,
  )
})

/// requests ///
server.route ('/')
  .get ((ri, ro) => {
    ro
      .status (200)
      .send (`<h1>web-db-1</h1>`)
  })

server.route ('*')
  .all (respondWithError (501))

/**************************************/

module.exports = server
