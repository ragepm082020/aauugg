const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/Users');

// Add User
/*projectRoute.route('/create').post((req, res, next) => {
    Project.create(req.body, (error, data) => {        if (error) {   return next(error)    } else {   res.json(data)    }   })
});*/

// Get All Users
userRoute.route('/').get((req, res) => { 
    User.find((error, data) => {                     if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  })
})

// Get single Project
userRoute.route('/read/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {  if (error) { return res.json(error)     } else {   res.json(data)    }  })
})

// Get Logged User details  - LIKE query
userRoute.route('/readStr/:userEmail').get((req, res) => {
    //User.findById(req.params.id, (error, data) => {  if (error) { return res.json(error)     } else {   res.json(data)    }  })
    User.find({userEmail: { $regex: '.*' + req.params.userEmail + '.*' } },(error, data) => {  if (error) { return res.json(error)     } else {   res.json(data)    }  });
    // OR query
    //User.find({userEmail: { $search: "bake coffee cake" }})
    //https://docs.mongodb.com/manual/reference/operator/query/text/
})

/*
// Update User
projectRoute.route('/update/:id').put((req, res, next) => {
    Project.findByIdAndUpdate(req.params.id, {    $set: req.body  }, (error, data) => {
                                                      if (error) {      return next(error);  console.log(error)    } else {  res.json(data); console.log('Data updated successfully')    }
  })
})

// Delete User
projectRoute.route('/delete/:id').delete((req, res, next) => {
    Project.findOneAndRemove(req.params.id, (error, data) => {
                                                    if (error) {      return next(error);    } else {   res.status(200).json({  msg: data   })
    }
  })
})*/

module.exports = userRoute;