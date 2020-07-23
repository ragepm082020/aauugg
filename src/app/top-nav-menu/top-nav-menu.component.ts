import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-top-nav-menu',
  templateUrl: './top-nav-menu.component.html',
  styleUrls: ['./top-nav-menu.component.css']
})
export class TopNavMenuComponent implements OnInit {
  projectsData:any; userData:any; userVal:any=[]; userId:any; userHeadingName:any;userHeadingImg:any;
  incrVal:any;projectCodeList:any=[];
  constructor(private apiService: ApiService) { }

  ngOnInit() { 
      this.apiService.getProjects().subscribe((data) => {    
      this.projectsData = data;       
      this.userData = JSON.parse(sessionStorage.userInfo);
      this.userId = sessionStorage['userId'];
      
      for(var i=0; i<this.userData.length;i++){        
        if(this.userData[i].userEmail ==this.userId){         
          this.userHeadingName = this.userData[i]['userName'];
          this.userHeadingImg = this.userData[i]['userImg'];
        }
      }     
      sessionStorage.setItem("ProjectsInfo", JSON.stringify(this.projectsData));      

      for(this.incrVal=0;this.incrVal < this.projectsData.length;this.incrVal++){       
        var projectCode = '';
        this.projectCodeList.push(this.projectsData[this.incrVal]['projectCode']);   
       // console.log(this.projectCodeList)
      }
      sessionStorage.setItem("issueProjectIdentity", this.projectCodeList);
          
    });
   }   

  checkOut(){            
    var n = sessionStorage.length;
    while(n--) {      
      var key = sessionStorage.key(n);
      if(/n/.test(key)) {      
        sessionStorage.removeItem(key);
        sessionStorage.removeItem('userId');
      }  
    }    
    location.href="http://localhost:4200/";    
  }
}