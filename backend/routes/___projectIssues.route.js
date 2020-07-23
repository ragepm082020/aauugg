const express = require('express');
const app = express();
const projectIssuesRoute = express.Router();

// Project model
let ProjectsIssues = require('../models/ProjectsIssues');

// Add Project Issue
projectIssuesRoute.route('/create').post((req, res, next) => { console.log('==============='); 
    ProjectsIssues.create(req.body, (error, data) => {        if (error) {   console.log(error)    } else {   res.json(data)    }   })
});

// Get All Projects Issues
projectIssuesRoute.route('/').get((req, res) => {     ProjectsIssues.find((error, data) => {    if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  }) })

// Get single Project Issue
projectIssuesRoute.route('/read/:id').get((req, res) => {
	ProjectsIssues.findById(req.params.id,(error, data) => {   if (error) {  console.log(error);    } else {    res.json(data);  /*console.log(data) */ }  })    
})

// Get Project Issues details  - LIKE query
projectIssuesRoute.route('/projectId/:issueProjectCode').get((req, res) => {
ProjectsIssues.find({issueProjectCode:req.params.issueProjectCode},(error, data) => {  if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  })
})

// Get Project Issues Activity details  - LIKE query
projectIssuesRoute.route('/activity/').get((req, res) => {  //$regex: '.*' + req.params.cmtStr + '.*' 
 ProjectsIssues.find({issueProjectCode:{ $regex: '/.*t212.*/' }}, (error, data) => {          if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  })
//ProjectsIssues.find({issueProjectCode:{ $regex: '/212$/' }},(error, data) => {           if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  })
})

// Update Project Issue
projectIssuesRoute.route('/update/:id').put((req, res, next) => {
    /*ProjectIssues.findByIdAndUpdate(req.params.id, {    $set: req.body  }, (error, data) => {
            if (error) {      return next(error);  console.log(error)    } else {  res.json(data); console.log('Data updated successfully')    }
  })*/
  ProjectIssues.findByIdAndUpdate(req.params.id, {    $set: req.body  }, 
    (error, data) => {       if (error) { return next(error); console.log(error) } else { res.json(data); console.log('Data updated successfully')    }  })
})

// Delete Project
/*projectIssuesRoute.route('/delete/:id').delete((req, res, next) => {
    ProjectIssues.findOneAndRemove(req.params.id, (error, data) => {
         if (error) {     return next(error);    } else {   res.status(200).json({  msg: data   })
    }
  })
})*/

module.exports = projectIssuesRoute;