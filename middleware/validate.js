const db = require('../data/dbConfig')

function validateId ( req, res, next ) {
    const { id } = req.params
    if ({ id }){
        db('accounts').select('*')
        .where({ id:  id  })
        .then(check => {
            if(check.length > 0){
                next()
            } else {
                res.status(500).json({error: 'data was lost'})
            }
        })
        .catch(error =>{
            res.status(500).json({error: "Looks like you entered the wrong ID :("});
        });
    } else {
        res.status(400).json({error: "invalid account id" })
    }
}

module.exports = validateId;