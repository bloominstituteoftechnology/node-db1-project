(ri, ro, next) => {
  database.__request__ ()
    .then ((value) => {
      // respond...
      ro
        .status (__code__)
        .json (__body__)
    })
    .catch ((error) => {
      // respond...
      clog (error)
      respondWithError (500) (ri, ro)
    })
}
