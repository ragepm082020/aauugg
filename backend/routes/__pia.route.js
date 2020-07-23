const express = require('express');
const app = express();
const piaRoute = express.Router();

// Employee model
let pia = require('../models/pia');

// Add Employee
piaRoute.route('/create').post((req, res, next) => {
   // res.json(data) 
    //console.log('inserting.....') return;
    pia.create(req.body, (error, data) => {           if (error) {  return next(error)  } else {  res.json(data)  }  })
});

// Get All Employees
piaRoute.route('/getActivities/projectId/:issueProjectCode').get((req, res) => {
    pia.find({issueProjectCode:req.params.issueProjectCode},(error, data) => {        if (error) {  return '===>'; /*next(error)*/  } else {  res.json(data)  }  })
})

piaRoute.route('/').get((req, res) => {     pia.find((error, data) => {    if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  }) })

module.exports = piaRoute;
