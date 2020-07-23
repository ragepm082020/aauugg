const express = require('express');
const app = express();
const projectIssueActivityRoute = express.Router();

// Project model
let ProjectIssueActivity = require('../models/projectIssueActivity');

// Add Project Issue
projectIssueActivityRoute.route('/create').post((req, res, next) => {
    console.log('==============='); 
    ProjectIssueActivity.create(req.body, (error, data) => {        
        if (error) {   console.log(error) } else {   res.json(data)   }
    })
});

// Get All Project Issue Activity
projectIssueActivityRoute.route('/').get((req, res) => {     
    ProjectIssueActivity.find((error, data) => {   
         if (error) {  return next(error)  } else {  res.json(data);  /*console.log(data) */     } 
    }) 
})

module.exports = projectIssueActivityRoute;