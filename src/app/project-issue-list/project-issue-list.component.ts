import { Component, PipeTransform,OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe, Location } from '@angular/common';
import { FormControl, FormsModule, FormGroup,FormBuilder, Validators } from '@angular/forms';

/*import 'rxjs/add/operator/debounceTime'; import 'rxjs/add/operator/distinctUntilChanged'; import 'rxjs/add/operator/switchMap';import { Observable } from 'rxjs'; import { map, startWith } from 'rxjs/operators';*/
import { ApiService } from './../../service/api.service';

declare var $: any;

@Component({
  selector: 'app-project-issue-list',
  templateUrl: './project-issue-list.component.html',
  styleUrls: ['./project-issue-list.component.css']
})
export class ProjectIssueListComponent implements OnInit {

  issueTypeSelect = 'Bug';
  issuePrioritySelect = 'Low';
  issueAssignedSelect = 'Unassigned';

  closeResult : string;  Projects:any = []; projectIssues:any = []; results: any[] = []; userInvolved:any[]; assignedUser:string; addIssueFrm : FormGroup;    
  arrUserList : any = []; projectsCode : any;  projectIssueObj:any; submitted = false; searchIssueFrm : FormGroup; usersArr:any; usersId:any; userName:any; 
  issuesCnt:any;

  constructor(private formBuilder: FormBuilder,pipe: DecimalPipe, private modalService: NgbModal, private apiService: ApiService, public _router:Router, public _location:Location) { 
    this.readProjectIssues();   this.searchIssueFrm = formBuilder.group({ searchKeyWord: [] });   
  }
  
  ngOnInit(){
    this.usersId = sessionStorage.getItem('userId');
    this.usersArr = JSON.parse(sessionStorage.getItem('userInfo'));
    
    for(var i=0;i<this.usersArr.length; i++){
      if(this.usersArr[i].userEmail == this.usersId){
        this.userName = this.usersArr[i].userName;
      }
    }

    this.addIssueFrm = this.formBuilder.group({
      issueHeading: ['', Validators.required],
      issueDesc: ['', Validators.required],
      issueType: ['', Validators.required],
      issuePriority: ['', Validators.required],
      issueAssigned: ['', Validators.required],
      issueCmts : []
    });
  }

  get f() { return this.addIssueFrm.controls; }

  onSubmit() {
    var issueCnt = sessionStorage.getItem("chosenProjId")
    const dateVal: Date = new Date();
    this.submitted = true;
    this.projectIssueObj={
      issueHeading : this.addIssueFrm.value.issueHeading, 
      issueDesc : this.addIssueFrm.value.issueDesc, 
      issueStatus : 'New', 
      issueType : this.addIssueFrm.value.issueType,
      issueInOrder : (this.issuesCnt+1),
      issueProjectCode : sessionStorage.getItem("chosenProjId"),
      issuePriority: this.addIssueFrm.value.issuePriority, 
      issueCreatedBy :  this.userName,
      issueAssignedTo : this.addIssueFrm.value.issueAssigned,
      issueCreatedDate: dateVal,
      issueModifiedDate: dateVal,
      comments: [{
        "commentDesc": this.addIssueFrm.value.issueCmts,
        "commentedBy": this.userName,
        "commentedOn": dateVal,
        "commentsId": sessionStorage.getItem("chosenProjId") + '_' + this.issuesCnt + '_' + 'issue_cmt1'
      }],
    };
    
    if (this.addIssueFrm.invalid) {   return;  }
    this.addProjectIssue(this.projectIssueObj);  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addIssueFrm.value))
}

  readProjectIssues(){    
    this.apiService.getProjects().subscribe((data) => {
      sessionStorage.removeItem("chosenProjId");      
      this.Projects = data; let projectId: any;       
      let queryString = window.location.href;
      projectId = queryString.split('/');     

      this.userInvolved = data[projectId[4]-1]['usersInvolved'];    
      this.projectIssues.projCode = data[projectId[4]-1]['projectCode'];
      this.projectsCode = data[projectId[4]-1].projectCode
      sessionStorage.setItem("chosenProjId",this.projectsCode);      
      this.apiService.getSpecifyProjectIssues(this.projectsCode).subscribe((data) => {   
        this.projectIssues = data;         //console.log(data)              
        this.issuesCnt = this.projectIssues.length; 
        
      })
    })
  }

  addProjectIssue(projectIssueObj){
     let queryString = window.location.href;
     let issuesArr = queryString.split('/');

     this.apiService.addProjectIssue(projectIssueObj).subscribe((data) => {          //console.log(data); 
        this.modalService.dismissAll('Save click');
         this._router.navigateByUrl("/viewIssue/"+issuesArr[4], { skipLocationChange:true}).then(() => {
          console.log(decodeURI(this._location.path()))
          this._router.navigate([decodeURI(this._location.path())]);
         });         
        
     })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => { this.closeResult = `Closed`;    }, 
    (reason) => {   /*console.log(reason); */   });
  }
}

$(document).ready(function () {
  $('.list-unstyled li').removeClass('active');
  $('.list-unstyled li:first').addClass('active');

  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)    });
  });
});