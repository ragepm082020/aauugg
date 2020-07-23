import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormsModule, FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { getLocaleDateTimeFormat } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.css']
})
export class ViewIssueComponent implements OnInit {
  issueStatusOptions:any;statusSelected:any;updateIssueStatus:any;
  issueIdArr: any;issueId: any; issueIdVal: any; projectCode:any; issueDetails: any; issueCol: any=[]; isCommentsVisible:boolean = true;  
  isActivityVisible:boolean = false;   val:any; sel:any; commentsArr:any; activityArr:any; usersObj:any; createdUserImg:any;  Users:any=[];
  commentsTotal=0; activityTotal=0; isImgsVisible:boolean=false; isImgsPresent:any;  issuesStatus:any;

  constructor(private apiService: ApiService,private router: Router) {
    let queryString = window.location.href;
    this.issueIdArr = queryString.split('/');
    this.issueId = this.issueIdArr[4];
    this.projectCode = sessionStorage.getItem("chosenProjId");    //this.viewIssue(this.issueId);     
   // this.
  }

  ngOnInit() {  
      this.issueStatusOptions = [
        {Id:1,Name:'New'},
        {Id:2,Name:'In Progress'},
        {Id:3,Name:'Ready to Test'},
        {Id:4,Name:'Reopen'}, 
        {Id:5,Name:'Closed'}
      ];
   
    this.apiService.getIssueList(this.issueId).subscribe((data) => {  
      this.issueCol.push(data);
      this.commentsArr = this.issueCol[0].comments;
      this.activityArr= this.issueCol[0].activity;
      this.usersObj = JSON.parse(sessionStorage.getItem("userInfo"));
      var searchField = "userName";      
      var searchVal = this.issueCol[0].issueCreatedBy;  //Find Created User Img
      var i = 1;
      for (var key in this.issueStatusOptions) {
        i++;
        if (this.issueStatusOptions.hasOwnProperty(key) && this.issueStatusOptions[key].Name==this.issueCol[0].issueStatus) {                 
            this.statusSelected = this.issueStatusOptions[key].Id; 
            this.issuesStatus = this.issueStatusOptions[key].Name;
        }
      }

      for (var i=0 ; i < this.usersObj.length ; i++){
          if (this.usersObj[i][searchField] == searchVal) {   this.issueCol[0].createdUserImg = (this.usersObj[i].userImg);    
          }
      }
      
      if(this.issueCol[0].comments.length > 0){  this.commentsTotal = this.issueCol[0].comments.length;      } 

      if(this.issueCol[0].activity){  this.activityTotal = this.issueCol[0].activity.length;     }  
      this.isImgsPresent = '';
      
      if(this.issueCol[0].imagesUploaded && this.issueCol[0].imagesUploaded.length > 0){ 
        this.isImgsVisible = true;     
        this.isImgsPresent = this.issueCol[0].imagesUploaded[0].imgLocation;  
      } else {  // console.log(document.getElementsByClassName('screenshotsSec')[0]) //  document.getElementsByClassName'screenshotsSec')[0].innerHTML='';
      }

      //Find Assigned User Img
      var search_Val = this.issueCol[0].issueAssignedTo;
      for (var i=0 ; i < this.usersObj.length ; i++){
        //console.log(this.usersObj[i][searchField] + "============" +search_Val)
          if (this.usersObj[i][searchField] == search_Val){ 
            this.issueCol[0].issueAssignedImg = (this.usersObj[i].userImg);                
          }
      } 
      //console.log(this.usersObj)
    })   
  } 

  onChange(selectedIssueStats){    
    let processingLoader = <HTMLInputElement>document.getElementById('processingLoader');
    processingLoader.style.display='block';
    if(selectedIssueStats==='1'){
      this.updateIssueStatus = 'New';
    } else if (selectedIssueStats=='2'){   this.updateIssueStatus = 'In Progress';
    } else if (selectedIssueStats=='3'){   this.updateIssueStatus = 'Ready to Test';
    } else if (selectedIssueStats=='4'){   this.updateIssueStatus = 'Reopen';
    }  else if (selectedIssueStats=='5'){  this.updateIssueStatus = 'Closed';    }
   
   this.apiService.updateProjectIssues(this.issueId, this.updateIssueStatus).subscribe((data) => {  
   processingLoader.style.display='none';

    (function(){
        var show = function(){  processingLoader.style.display = "block"; setTimeout(hide, 1500);  };
        var hide = function(){  processingLoader.style.display = "none";                           };
        show();
    })();
    this.router.navigate(['/viewIssue/' + this.issueId])     
   })
   
   let emailId = sessionStorage.getItem("userId");    //console.log('----->'+emailId);   return;
   this.apiService.getUsers(emailId).subscribe((data) => {
    this.Users = data;     
     let projCode = sessionStorage.getItem('chosenProjId');   
     var dateNow  = new Date();
     var dateTimeNow = dateNow.getFullYear()+"-"+('0' + (dateNow.getMonth()+1)).slice(-2)+"-"+('0' + dateNow.getDate()).slice(-2)+"T"+dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds()+"Z";
     
     let addTimelineData ={issueId:this.issueId,issueProjectCode: projCode, userUpdated: this.Users[0].userName, subject: "Status",fromactivity: this.issuesStatus,toactivity:this.updateIssueStatus,activityUpdated:dateTimeNow};
         
     this.apiService.addProjectIssueActivty(addTimelineData).subscribe((res) => {
        console.log('Project Activity successfully created!')        
      }, (error) => {
        console.log(error);
      });
   })
  }    

  showComments(){
    let commentsSec = <HTMLInputElement>document.getElementById('commentsSecId');
    let issueActivitySec = <HTMLInputElement>document.getElementById('issueActivitySecId');
    this.isCommentsVisible = true;
    this.isActivityVisible = false;
    commentsSec.style.color='#fff';
    issueActivitySec.style.color='#000';    
  }

  showActivity(){
    let commentsSec = <HTMLInputElement>document.getElementById('commentsSecId');
    let issueActivitySec = <HTMLInputElement>document.getElementById('issueActivitySecId');
    this.isCommentsVisible = false;
    this.isActivityVisible = true;   
    commentsSec.style.color='#000';
    issueActivitySec.style.color='#fff';
  }
}

function uploadImgs(){  }