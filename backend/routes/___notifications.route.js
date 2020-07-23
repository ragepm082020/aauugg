const express = require('express');
const app = express();
const notificationsRoute = express.Router();

// model
let notificationss = require('../models/Notifications');

// Get All Notifications
notificationsRoute.route('/').get((req, res) => { 
    notificationss.find((error, data) => {  if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  })
})

// Add Employee
notificationsRoute.route('/create').post((req, res, next) => {   
console.log(req.body)
   notificationss.create(req.body, (error, data) => {   if (error) {  return next(error)  } else {  res.json(data)  }  })
});

notificationsRoute.route('/delete/:id').delete((req, res, next) => {
    notificationss.findOneAndRemove(req.params.id, (error, data) => {    if (error) {      return next(error);    } 
    else {  res.status(200).json({   msg: data  }) }  })
})


module.exports = notificationsRoute;