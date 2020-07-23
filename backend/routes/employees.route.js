const express = require('express');
const app = express();
const employeeRoute = express.Router();

// Employee model
let employees = require('../models/Employees');

// Add Employee
employeeRoute.route('/create').post((req, res, next) => {
    employees.create(req.body, (error, data) => {           if (error) {  return next(error)  } else {  res.json(data)  }  })
});

// Get All Employees
employeeRoute.route('/').get((req, res) => {
    employees.find((error, data) => {        if (error) {  return '===>'; /*next(error)*/  } else {  res.json(data)  }  })
})

// Get single employee
employeeRoute.route('/read/:id').get((req, res) => {
    employees.findById(req.params.id, (error, data) => {    if (error) {  return next(error)  } else { res.json(data)  }  })
})


// Update employee
employeeRoute.route('/update/:id').put((req, res, next) => {
    employees.findByIdAndUpdate(req.params.id, {    $set: req.body  }, 
    (error, data) => {       if (error) { return next(error); console.log(error) } else { res.json(data); console.log('Data updated successfully')    }  })
})

// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
    employees.findOneAndRemove(req.params.id, (error, data) => {    if (error) {      return next(error);    } else {      res.status(200).json({        msg: data      })    }  })
})

module.exports = employeeRoute;