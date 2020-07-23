const express = require('express');
const app = express();
const issueActivityRoute = express.Router();

// Employee model
let issueActivity = require('../models/issueActivity');

// Add Employee
issueActivityRoute.route('/create').post((req, res, next) => {
    issueActivity.create(req.body, (error, data) => {   if (error) {  return next(error)  } else {  res.json(data)  }  })
});

// Get All Employees
issueActivityRoute.route('/').get((req, res) => {
    issueActivity.find((error, data) => {  if (error) {  return '===>'; /*next(error)*/  } else {  res.json(data)  }  })
})

issueActivityRoute.route('/getActivities/projectId/:issueProjectCode').get((req, res) => {
    issueActivity.find({issueProjectCode:req.params.issueProjectCode},(error, data) => {        if (error) {  return next(error)  } else {  res.json(data)  }  })
})

// Get single employee
issueActivityRoute.route('/read/:id').get((req, res) => {
    issueActivity.findById(req.params.id, (error, data) => {    if (error) {  return next(error)  } else { res.json(data)  }  })
})

// Update employee
issueActivityRoute.route('/update/:id').put((req, res, next) => {
    issueActivity.findByIdAndUpdate(req.params.id, {    $set: req.body  }, 
    (error, data) => {       if (error) { return next(error); console.log(error) } else { res.json(data); console.log('Data updated successfully')    }  })
})

// Delete employee
issueActivityRoute.route('/delete/:id').delete((req, res, next) => {
    issueActivity.findOneAndRemove(req.params.id, (error, data) => {    if (error) {      return next(error);    } else {      res.status(200).json({        msg: data      })    }  })
})

module.exports = issueActivityRoute;