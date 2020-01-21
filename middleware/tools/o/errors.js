/***********************************************************
  errors
***********************************************************/

const { error } = require ('../')

/***************************************
  MAIN
***************************************/

const errorResponse = (defaultErrorMessage) => (
  (restOfErrorMessage = '', restOfError = {}) => (
    (ri, ro) => {
      const responseErrorMessage = defaultErrorMessage + restOfErrorMessage

      const restOfResponseError = {
        method : ri.method,
        route : ri.originalUrl,
        ...restOfError,
      }

      return error (responseErrorMessage, restOfResponseError)
    }
  )
)

const errors = {
  '400' : errorResponse ('bad request'),
  '404' : errorResponse ('resource not found'),
  '500' : errorResponse ('something bad happened'),
  '501' : errorResponse ('not implemented ... yet?'),
}

/**************************************/

module.exports = errors
