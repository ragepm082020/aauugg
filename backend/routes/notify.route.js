const express = require('express');
const app = express();
const notifyRoute = express.Router();

let notify = require('../models/notify');
// Get All Notifications
notifyRoute.route('/').get((req, res) => { 
    notify.find((error, data) => {  if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  })
})
// Add Notifications
notifyRoute.route('/create').post((req, res, next) => {   
console.log(req.body)
   notify.create(req.body, (error, data) => {   if (error) {  return next(error)  } else {  res.json(data)  }  })
});
notifyRoute.route('/delete/:id').delete((req, res, next) => {
    notify.findOneAndRemove(req.params.id, (error, data) => {    if (error) {      return next(error);    } 
    else {  res.status(200).json({   msg: data  }) }  })
})
module.exports = notifyRoute;