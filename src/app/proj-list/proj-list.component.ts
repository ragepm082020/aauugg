import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-proj-list',
  templateUrl: './proj-list.component.html',
  styleUrls: ['./proj-list.component.css']
})
export class ProjListComponent implements OnInit {
  Projects:any=[]; ProjectData:any=[]; projObj:any; userDetails:any=[];
  constructor(private modalService: NgbModal,private apiService: ApiService) {    /* this.readProject();*/ 
  
    this.Projects = JSON.parse(sessionStorage.getItem("ProjectsInfo"));    

    if(!this.Projects){      //console.log('Project List not received');
      this.apiService.getProjects().subscribe((data) => {   
        this.Projects = data;
        //console.log(data)
      })
    }   
  }
  ngOnInit() {    
    this.userDetails= JSON.parse(sessionStorage.getItem('userInfo'));
    //console.log(JSON.parse(sessionStorage.getItem('ProjectsInfo')))
    //console.log(this.Projects)
  }

   addProject(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {   }, 
      (reason) => {   /*console.log(reason); */   });
  }   

  getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }
  

  addProjectOnSubmit(event: any){
    let projectCode = event.target.projectCode.value;
    let projectName =  event.target.nameData.value; 
    let shortDesc = event.target.shortDesc.value; 
    let usersInvolved = event.target.usersInvolved.value;
    //console.log('---------->');
    console.log(sessionStorage);
    var el = document.getElementsByTagName('select')[0];
    //console.log(this.getSelectValues(el));
    
  }

  //readProject(){ this.apiService.getProjects().subscribe((data) => {  this.Projects = data; console.log(data);  })  }
}

$(document).ready(function () {
  
 // $('#sidebar').css('display','none');
 // $('#sidebarCollapse').on('click', function () {   //$('#sidebar').toggleClass('active');          //$('#sidebar').css('display','none');
});  


