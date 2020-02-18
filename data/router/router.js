const express = require('express');

const db = require('../dbConfig.js')
const router = express.Router();

//Post Routes
router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
        .then(post => {
            console.log(post);
            res.status(201).json({message: "user created!", user: {...post}})
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Internal Error Adding The User',
            });
        });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  postDb.insert(req.body)
        .then(posts => {
            console.log(posts);
            res.status(201).json({message: "Success", data: {...posts}})
        })
        .catch(error => {
            // log error to database
            console.log(error);
            res.status(500).json({
                message: 'Internal Error Adding The User Post',
            });
        });
});

//Get Routes

router.get('/', (req, res) => {
    db.get().then(users =>{
      res.status(200).json({message: "Success", data: {...users}})
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
          message: 'Internal Error Adding The Users',
      });
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  db.getById(req.params.id)
  .then(user => {
    (user) ?
    res.status(200).json({message: "Success", data: {...user}}) : 
    res.status(404).json({message: "User Not Found"}) 
  })
  
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
        message: 'Internal Error Getting The User',
    });
  })
});

router.get('/:id/posts', (req, res) => {
  postDb.get().then(posts =>{
    console.log(posts);
    res.status(200).json({message: "Success", data: {...posts}})
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
        message: 'Internal Error Getting The Posts',
    });
  })
});

//Delete Routes
router.delete('/:id', validateUserId, (req, res) => {
  db.remove(req.params.id)
  .then(user => {
    (user > 0) ? 
    res.status(200).json({message: "Successfully Deleted"}) :
    res.status(404).json({message: "User Not Found"})
  })
  
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
        message: 'Internal Deleting The User',
    });
  })
});
//Put End Points
router.put('/:id', validateUser, validateUserId, (req, res) => {
  const changes = req.body;
  (changes.name === '') ? 
  res.status(400).json({message: 'required field name cannot be empty'}) :
  db.update(req.params.id, changes)
  .then(user => {
    (user > 0) ?
    res.status(200).json({message: "Successfully Updated", user: {...changes}}) :
    res.status(404).json({message: "Could Not Find User To Update"})
  })
  .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
        message: 'Internal Editing The User',
    });
  })
});

//custom middleware
//for checking user with only the id as param
function validateUserId(req, res, next) {
  db.getById(req.params.id).then(user => {
    if (user) {
        req.user = user;
        console.log(`passed user ID check:`, req.user)
        next();
    } else {
        res.status(404).json({ message: "The specified ID does not exist." });
    }
}).catch(err => console.log(err))
}

//for passing a body in
function validateUser(req, res, next){
  console.log('Validating User...');
  if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
    return res.status(500).json({ message: "missing user data" });
  } else if(!req.body.name){
    return res.status(500).json({ message: "missing required name field" });
  }else{
    console.log('passed user check:', req.body);
  }
  next(); //valid passes check
  }

function validatePost(req, res, next){
  console.log('Validating Post...');
  if(Object.entries(req.body).length === 0 && req.body.constructor === Object){
    return res.status(500).json({ message: "missing post data" });
  } else if(!req.body.text || req.body.text === ''){
    return res.status(500).json({ message: "missing required text field" });
  }
  next(); //valid passes check
  }

module.exports = router;
