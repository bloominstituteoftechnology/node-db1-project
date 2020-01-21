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
      database['accounts'].getAll ()
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
      database['accounts'].push (ri.body)
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
  .all ([
    /* get :account_id if it exists*/
    (ri, ro, next) => {
      database['accounts'].get (ri.params.account_id)
      .then ((value) => {
        if (value) {
          ri.locals = {
            account : value,
            ...(ri.locals || {}),
          }
          next ()
        }
        else {
          respondWithError (404) (ri, ro)
        }
      })
      .catch ((error) => {
        // respond...
        clog (error)
        respondWithError (500) (ri, ro)
      })
    }
  ])
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
      database['accounts'].set (ri.params.account_id, ri.body)
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
  .delete ([
    (ri, ro, next) => {
      database['accounts'].pull (ri.params.account_id)
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
