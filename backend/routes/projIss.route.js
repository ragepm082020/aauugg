const express = require('express');
const app = express();
const projIssRoute = express.Router();

// Project model
let ProjIss = require('../models/ProjIss');

// Add Project Issue
projIssRoute.route('/create').post((req, res, next) => { //console.log('==============='); 
  ProjIss.create(req.body, (error, data) => {        if (error) {   console.log(error)    } else {   res.json(data)    }   })
});

// Get All Projects Issues
projIssRoute.route('/').get((req, res) => {     ProjIss.find((error, data) => {    if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  }) })

// Update Project Issue
projIssRoute.route('/update/:id').put((req, res, next) => {
    /*ProjectIssues.findByIdAndUpdate(req.params.id, {    $set: req.body  }, (error, data) => {
            if (error) {      return next(error);  console.log(error)    } else {  res.json(data); console.log('Data updated successfully')    }
  })*/
  ProjIss.findByIdAndUpdate(req.params.id, {    $set: req.body  }, 
    (error, data) => {       if (error) { return next(error); console.log(error) } else { res.json(data); console.log('Data updated successfully')    }  })
})

projIssRoute.route('/read/:id').get((req, res) => {
	ProjIss.findById(req.params.id,(error, data) => {   if (error) {  console.log(error);    } else {    res.json(data);  /*console.log(data) */ }  })    
})

projIssRoute.route('/projectId/:issueProjectCode').get((req, res) => {
  ProjIss.find({issueProjectCode:req.params.issueProjectCode},(error, data) => {  if (error) {  return next(error)    } else {    res.json(data);  /*console.log(data) */ }  })  
})

/*projIssRoute.route('/totalCnt/:issueProjectCode').get((req, res) => {
  var res1, res2;
  ProjIss.countDocuments({issueProjectCode:req.params.issueProjectCode}, function(err, result) {
    if (err) {  console.log(err);                   }  
    else     {  //res.json(req.params.issueProjectCode+'__'+result); 
     res1 = result; }
    console.log(req.params.issueProjectCode+'___'+ res1)
  });
  
  ProjIss.countDocuments({issueProjectCode:req.params.issueProjectCode,issueStatus:'Closed'}, function(err, result) {
    if (err) {  console.log(err);                   }  
    else     {  //res.json(result); 
      res2 = result; 
      res.json(req.params.issueProjectCode+'___'+ res1 + '___'+ res2); 
      console.log(req.params.issueProjectCode+ '___'+ res2)
    }
  });
});*/

projIssRoute.route('/listAll/:projectIdsList').get((req, res) => {  
  //var projList ='t212___t305___t313___t307';
  var projList = req.params.projectIdsList;
  var resArr = projList.split("___"); // for(var incr = 0; incr<res.length;incr++){    
  var resultArr=[];   var res1;
  
  ProjIss.countDocuments({issueProjectCode:resArr[0]}, function(err, result) {
      if (err) {  console.log(err);            }  
      else     {  total_res_1 = result;        }

      ProjIss.countDocuments({issueProjectCode:resArr[0],issueStatus:'Closed'}, function(err, result) {
        if (err) {  console.log(err);                   }  
        else     {   total_closed_res_1 = result;  }          
        resultArr.push(resArr[0] + '___' + total_res_1 + '___' + total_closed_res_1);          
      });

      ProjIss.countDocuments({issueProjectCode:resArr[1]}, function(err, result2) {
          if (err) {  console.log(err);         }  
          else     {  res2 = result2;           }
          ProjIss.countDocuments({issueProjectCode:resArr[1],issueStatus:'Closed'}, function(err, result) {
            if (err) {  console.log(err);              }  
            else     {   total_closed_res_2 = result;  }
            resultArr.push(resArr[1] + '___' + res2 + '___' + total_closed_res_2);              
          });           
      });
      
      ProjIss.countDocuments({issueProjectCode:resArr[2]}, function(err, result) {
          if (err) {  console.log(err);       }  
          else     {  res3 = result;          }
          ProjIss.countDocuments({issueProjectCode:resArr[2],issueStatus:'Closed'}, function(err, result) {
            if (err) {  console.log(err);              }  
            else     {   total_closed_res_3 = result;  }
            resultArr.push(resArr[2] + '___' + res3 + '___' + total_closed_res_3);                       
          });            
      });

      ProjIss.countDocuments({issueProjectCode:resArr[3]}, function(err, result) {
          if (err) {  console.log(err);           }  
          else {      res4 = result;              }
          ProjIss.countDocuments({issueProjectCode:resArr[3],issueStatus:'Closed'}, function(err, result) {
            if (err) {  console.log(err);              }  
            else     {   total_closed_res_4 = result;  }
            resultArr.push(resArr[3] + '___' + res4 + '___' + total_closed_res_4) //console.log(resArr[3] + '___' + res4)
            res.json(resultArr);
          });            
      });        
    });  
});

projIssRoute.route('/listAssignedUsers/:projectId').get((req, res) => {  
  //var projList ='t212___t305___t313___t307';
  //var projList = req.params.projectIdsList;
  //var resArr = projList.split("___"); // for(var incr = 0; incr<res.length;incr++){    
  //var resultArr=[];   var res1;
  var assignedUsersArr =[];
  var resArrList = [];
  var assignedUsersCntArr = [];

    ProjIss.find({issueProjectCode:req.params.projectId},(error, data) => {  
      if (error) {  return next(error)    } else {
        for(var incrVal=0;incrVal<data.length;incrVal++){
          assignedUsersArr.push(data[incrVal]['issueAssignedTo'])
        }

       function removeDup(assignedUsersArr){
         return assignedUsersArr.filter((value, index) => assignedUsersArr.indexOf(value) === index);
       }       
       resArrList = removeDup(assignedUsersArr);      //res.json(resArrList);
      } 
        
        ProjIss.countDocuments({issueProjectCode:req.params.projectId,issueAssignedTo: resArrList[0]}, function(err, result) {
            if (err) {  console.log(err);        }
            else     {  //console.log(resArrList[0] +'########' + result);    
            }
            assignedUsersCntArr.push(resArrList[0] + '########' + result)
        });

        ProjIss.countDocuments({issueProjectCode:req.params.projectId,issueAssignedTo: resArrList[1]}, function(err, result) {
            if (err) {  console.log(err);        }  
            else     {  //console.log(resArrList[1] +'########' + result);    
            }   
            assignedUsersCntArr.push(resArrList[1] + '########' + result);           
        });
       
        if(resArrList[2]){
          ProjIss.countDocuments({issueProjectCode:req.params.projectId,issueAssignedTo: resArrList[2]}, function(err, result) {
              if (err) {  console.log(err);        }  
              else     {  
                //console.log(resArrList[2] +'########' + result);    
              }  
              assignedUsersCntArr.push(resArrList[2] + '########' + result)    
              
              if(!resArrList[3]){
                //console.log('3rd array child - data not found')
                assignedUsersCntArr.push("____"+req.params.projectId);
                var resultArr = assignedUsersCntArr.join('@@@@@@');
                res.json(resultArr);
              }            
          });          
        }

        /*if(resArrList[3]){
            ProjIss.countDocuments({issueProjectCode:req.params.projectId,issueAssignedTo: resArrList[3]}, function(err, result) {
                if (err) {  console.log(err);        }
                else     {  
                 // console.log(resArrList[3] +'########' + result);    
                }
                assignedUsersCntArr.push(resArrList[3] + '########' + result) 
                assignedUsersCntArr.push("____"+req.params.projectId);               
            });  
        }*/          
        
    });  
});
module.exports = projIssRoute;