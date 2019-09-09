var accountsRouter = require("express").Router();
var db = require("./data/db.js");


accountsRouter.route("/")
.get(function rootGetController(_, response){
    db.find()
    .then(function handleFind(result){
        response.send(result);
    })
})
.post(function rootPostController({body:account}, response){
    
})

accountsRouter.route("/:id")
.get(function idGetController({params:{id}}, response){
    db.findById(id)
    .then(function handleFindById(result){
        response.send(result);
    })
})

module.exports = accountsRouter;