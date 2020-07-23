import { Component, OnInit,Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
//declare var projectRaisedCnt = 10;//: number;

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})

export class MainDashboardComponent implements OnInit{
  
  projectList:any; 
  projectIdsList:string; 
  chartBarLabels:any=[];  
  projectCodeIds:any=[];  
  incrVal:any;
  issueProjectIds:any=[];
  issueProjectIdsArr:any=[];
  project1_total_cnt:any;
  project2_total_cnt:any;
  project3_total_cnt:any;
  project4_total_cnt:any;
  project1_closed_total_cnt:any;
  project2_closed_total_cnt:any;
  project3_closed_total_cnt:any;
  project4_closed_total_cnt:any;

  assignedUsersEntireArr:any=[];
  assignedUsersArr:any=[];
  assignedUserArr:any=[];
  assignedUsersStrArr:any=[];
  assignedUsersCountArr:any=[];
  assignedUsersProjectId:any;
  incrAssignedUser:any;
  
  projectBugsRaisedCnt:number;
  
  public barChartLabels:any=[];
  public barChartType:any;
  public barChartLegend:boolean;
  public barChartData:Object;
  public barChartOptions:Object;  
  
    
  constructor(private apiService: ApiService,private modalService: NgbModal, private cdr: ChangeDetectorRef)  {    
    (async () => { 
      await this.delay(1500);      
      this.projectList = JSON.parse(sessionStorage.getItem('ProjectsInfo'));      
      
      if(this.projectList){
          for(this.incrVal=0;this.incrVal < this.projectList.length;this.incrVal++){
            this.chartBarLabels.push(this.projectList[this.incrVal]['name']);         
          }         
      }     

      (async () => { 
        await this.delay(500); 
        $('#bar-chart-container').css('display','block'); 
        this.issueProjectIds = sessionStorage.getItem("issueProjectIdentity")        
        this.issueProjectIds = this.issueProjectIds.replace(/,/g, "___");        
        
        this.apiService.getAllTotalIssues(this.issueProjectIds).subscribe((data) => {            
          var dataStrArr1 = data[0].split('___');   
          this.project1_total_cnt = dataStrArr1[1];
          this.project1_closed_total_cnt = dataStrArr1[2];

          var dataStrArr2 = data[1].split('___');   
          this.project2_total_cnt = dataStrArr2[1];
          this.project2_closed_total_cnt = dataStrArr2[2];

          var dataStrArr3 = data[2].split('___');   
          this.project3_total_cnt = dataStrArr3[1];
          this.project3_closed_total_cnt = dataStrArr3[2];

          var dataStrArr4 = data[3].split('___');   
          this.project4_total_cnt = dataStrArr4[1];
          this.project4_closed_total_cnt = dataStrArr4[2];
         
        });        
        await this.delay(1000);      
        
        this.barChartData = [
          {data: [this.project1_total_cnt,  this.project2_total_cnt, this.project3_total_cnt, this.project4_total_cnt], label: '# raised'},
          {data: [this.project1_closed_total_cnt, this.project2_closed_total_cnt, this.project3_closed_total_cnt,this.project4_closed_total_cnt], label: '#closed'}
        ];        
    
      })(); 
      
      this.apiService.getusersAssignedIssues('t212').subscribe((data) => {            
          //console.log(data);          
          this.assignedUsersEntireArr = data.split("____");        
          this.assignedUsersArr = this.assignedUsersEntireArr[0].split("@@@@@@");         
          for(this.incrAssignedUser = 0; this.incrAssignedUser < this.assignedUsersArr.length - 1; this.incrAssignedUser++){
           this.assignedUsersStrArr = this.assignedUsersArr[this.incrAssignedUser].split('########');    
            this.assignedUserArr.push(this.assignedUsersStrArr[0])
            this.assignedUsersCountArr.push(this.assignedUsersStrArr[1])
          }          
      });
      
      this.doughnutChartLabels = this.assignedUserArr; //['Shankar Arunachalam', 'Anatte Frency', 'Dinesh Mohan Singh', 'JaiKumar'];
      this.doughnutChartData = this.assignedUsersCountArr;//[2, 3, 5, 2];

  })();  
  
  this.barChartLabels = this.chartBarLabels;
  this.barChartType = 'bar';  
  this.barChartLegend = true;
  this.projectBugsRaisedCnt = 10;
  
  this.barChartData = [
    {data: [ 10,  10, 10, 10], label: '# raised'},
    {data: [6, 2, 7, 0], label: '#closed'}
  ]; 
     
  this.barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      xAxes: [  {  ticks: {  beginAtZero: true,min: 0 }    }   ],
      yAxes: [  {  ticks: {  beginAtZero: true, min: 0 }    }   ]
    }
  };    
}

ngOnInit() {   
  
}

public doughnutChartLabels = ['Shankar Arunachalam', 'Anatte Frency', 'Dinesh Mohan Singh', 'JaiKumar'];
public doughnutChartData = [2, 3, 5, 2];
public doughnutChartType = 'doughnut';

onChange(selectedProjectId){  
  this.apiService.getusersAssignedIssues(selectedProjectId).subscribe((data) => {
        console.log(data)
        this.assignedUsersEntireArr = data.split("____");
        this.assignedUsersArr = this.assignedUsersEntireArr[0].split("@@@@@@");       
        this.assignedUserArr = [];  
        this.assignedUsersCountArr = [];
        this.delay(2000);
        for(this.incrAssignedUser = 0; this.incrAssignedUser < this.assignedUsersArr.length - 1; this.incrAssignedUser++){
        this.assignedUsersStrArr = this.assignedUsersArr[this.incrAssignedUser].split('########');    
          this.assignedUserArr.push(this.assignedUsersStrArr[0])
          this.assignedUsersCountArr.push(this.assignedUsersStrArr[1])
        }            
  });
  
  this.doughnutChartLabels = this.assignedUserArr; 
  this.doughnutChartData = this.assignedUsersCountArr;

  }



  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  } 

}

$(document).ready(function () {  
  //$('#sidebarCollapse').on('click', function () {      $('#sidebar').toggleClass('active');  });  
});