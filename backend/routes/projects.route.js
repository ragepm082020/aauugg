const express = require('express');
const app = express();
const projectRoute = express.Router();

let Project = require('../models/Projects');

// Add Project
projectRoute.route('/create').post((req, res, next) => {
    Project.create(req.body, (error, data) => {   if (error) {   return next(error)    } else {   res.json(data)    }   })
});

// Get All Projects
projectRoute.route('/').get((req, res) => { 
    Project.find((error, data) => {      if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */  }  })
})

// search projects and its Status
//projectRoute.route('/searchTxt/:str').get((req, res) => { console.log('searching......');
   //Project.findById(req.params.str, (error, data) => {  if (error) { return next(error)     } else {   res.json(data)    }  })
//})

// Get single Project
projectRoute.route('/read/:id').get((req, res) => {
    Project.findById(req.params.id, (error, data) => {  if (error) { return res.json(error)     } else {   res.json(data)    }  })
})

// Get Logged User details  - LIKE query
projectRoute.route('/projectView/:id').get((req, res) => {    
    Project.find({_id: { $regex: '.*' + req.params.id + '.*' } },(error, data) => {  if (error) { return res.json(error)     } else {   res.json(data)    }  });    
})

// Update Project
projectRoute.route('/update/:id').put((req, res, next) => {
    Project.findByIdAndUpdate(req.params.id, {    $set: req.body  }, (error, data) => {
              if (error) {      return next(error);  console.log(error)    } else {  res.json(data); console.log('Data updated successfully')    }
  })
})

// Delete Project
projectRoute.route('/delete/:id').delete((req, res, next) => {
    Project.findOneAndRemove(req.params.id, (error, data) => {
            if (error) {      return next(error);    } else {   res.status(200).json({  msg: data   })
    }
  })
})

module.exports = projectRoute;