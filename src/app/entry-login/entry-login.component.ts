import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entry-login',
  templateUrl: './entry-login.component.html',
  styleUrls: ['./entry-login.component.css']
})

export class EntryLoginComponent implements OnInit {
  Users:any = [];allUserInfo:any;
  isVisible = false;
  constructor(private apiService: ApiService, public _router:Router, public _location:Location) { /* this.checkUser();*/ }
  ngOnInit() { }

  storeVal() {          
    let userId = (<HTMLInputElement>document.getElementById('userId')).value;
    this.apiService.getAllUsers().subscribe((data) => {
      this.allUserInfo = data; 
      let incrVal = 0;
            
      for(let usersInfo of this.allUserInfo){       //if(Object.keys(this.Users).length > 0){
        if(usersInfo.userEmail === userId){ 
          incrVal++;
          sessionStorage.setItem("userId", userId);  // location.href='/dashboard';       
        }
      }
            
      if(incrVal > 0){
        sessionStorage.setItem("userInfo", JSON.stringify(this.allUserInfo));

        this._router.navigateByUrl("/projectsList", { skipLocationChange:false}).then(() => {
         // console.log(decodeURI(this._location.path()))
          this._router.navigate([decodeURI(this._location.path())]);
         });
       // location.href='/projectsList';
      } else {
        this.isVisible = true;
      }
    });
  
  }
  
}