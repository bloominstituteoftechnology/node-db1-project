/***********************************************************
  ~/accounts - router
***********************************************************/

/// tools ///

const { clog } = require ('../../../tools')
const express = require ('express')

/// middleware ///

const {
  respondWithError,
} = require ('../../../middleware')

/***************************************
  setup router
***************************************/

const router = express.Router ()
const database = {
  'accounts' : require ('../accounts/database'),
}

/***************************************
  requests
***************************************/

router.route ('/')
  .get ([
    (ri, ro, next) => {
      database['accounts'].get ()
        .then ((value) => {
          // respond...
          ro
            .status (200)
            .json (value)
        })
        .catch ((error) => {
          // respond...
          clog (error)
          respondWithError (500) (ri, ro)
        })
    },
  ])
  .post ([
    (ri, ro, next) => {
      database['accounts'].insert (ri.body)
        .then ((value) => {
          // respond...
          ro
            .status (201)
            .json (value)
        })
        .catch ((error) => {
          // respond...
          clog (error)
          respondWithError (500) (ri, ro)
        })
    },
  ])

router.route ('/:account_id')
  .get ([
    (ri, ro, next) => {
      // respond...
      ro
        .status (200)
        .json (ri.locals.account)
    },
  ])
  .put ([
    (ri, ro, next) => {
      database['accounts'].update (ri.params.account_id, ri.body)
        .then ((value) => {
          // respond...
          ro
            .status (200)
            .json (value)
        })
        .catch ((error) => {
          // respond...
          clog (error)
          respondWithError (500) (ri, ro)
        })
    },
  ])
  .delete ([
    (ri, ro, next) => {
      database['accounts'].remove (ri.params.account_id)
        .then ((value) => {
          // respond...
          ro
            .status (200)
            .json (ri.locals.account)
        })
        .catch ((error) => {
          // respond...
          clog (error)
          respondWithError (500) (ri, ro)
        })
    },
  ])

router.route ('*')
  .all (respondWithError (501))

/**************************************/

module.exports = router
