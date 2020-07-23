import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  Projects:any; projectIssues:any;projectIssueActivity:any; logArr:any=[]; objData:any; objDataTest:any;  objDataList:any; gender:any; myTimelineObject:any;myProjectObject:any;  result:any=[]; currentProjectId:any=[];projectIssuesMap:any=[];resVal:any;resultVal:any;
  constructor(private apiService: ApiService) { }   //arr :any=[];

  ngOnInit() {

   console.log(Object.keys(sessionStorage));
   this.currentProjectId = sessionStorage.getItem('chosenProjId');
    
   this.Projects = JSON.parse(sessionStorage.getItem("ProjectsInfo"));
   //console.log(this.Projects)

   this.apiService.getSpecifyProjectIssues(this.currentProjectId).subscribe((data) => {
    this.projectIssues = data; console.log(this.projectIssues)
    for(var y = 0; y < this.projectIssues.length; y++){ 
      let strVal = this.projectIssues[y]._id+'###'+this.projectIssues[y].issueHeading;
      this.projectIssuesMap.push(strVal)
    }
  }) 
    
  this.apiService.getAllIssueActivities(this.currentProjectId).subscribe((data) => {
    this.projectIssueActivity = data;       
    this.myTimelineObject = [];
    
    for(var q = 0; q < this.projectIssueActivity.length; q++){                  
            var activityLog = this.projectIssueActivity[q];   
            this.resultVal = getIssueHeadingId(activityLog.issueId, this.projectIssuesMap);            
            console.log(this.resultVal)
            this.resultVal = this.resultVal.split('###');              
            this.myTimelineObject.push({userUpdated:activityLog.userUpdated,subject:activityLog.subject, fromactivity:activityLog.fromactivity, toactivity:activityLog.toactivity, activityUpdated:activityLog.activityUpdated, activityUpdatedIssue: this.resultVal[1] }) ;        
         
    }   

    function getIssueHeadingId(issueId, projectIssuesMap){       
      for(var x = 0; x < projectIssuesMap.length; x++){          
        if (projectIssuesMap[x].indexOf(issueId) > -1) {            
         // if (projectIssuesMap[x] !== undefined) {
            return projectIssuesMap[x];
          //}              
        } 
      }        
    }
     
  })

  }
}