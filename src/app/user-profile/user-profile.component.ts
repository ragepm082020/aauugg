import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './../../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './../_helpers/must-match.validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
      registerForm: FormGroup;
      submitted = false;
      
      Users:any = [];  closeResult: string; changePassForm: FormGroup;isIncorrectPwdVisible = false;
      constructor(private modalService: NgbModal, private apiService: ApiService, private formBuilder: FormBuilder) { this.readUser(); }
      /*return;
      existingPwd = this.Users[0].userPwd;

      mouseLeave(div : string){        
        let oldPwd = (<HTMLInputElement>document.getElementById('oldPwd')).value; 
        if(this.existingPwd != oldPwd){      this.isIncorrectPwdVisible=true;   } else {      this.isIncorrectPwdVisible=false;    }
    }*/

    ngOnInit() {
      let userId = sessionStorage.getItem("userId");

      this.registerForm = this.formBuilder.group({
          oldPwd: ['', Validators.required],        
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
      }, { validator: MustMatch('password', 'confirmPassword')  });
    }

    get f() { return this.registerForm.controls; }   // convenience getter for easy access to form fields

    onSubmit() {
        this.submitted = true;
        let existingPwd = this.Users[0].userPwd;
        let oldPwd = (<HTMLInputElement>document.getElementById('oldPwd')).value;
        if(existingPwd != oldPwd){      this.isIncorrectPwdVisible=true;   } else {      this.isIncorrectPwdVisible = false;    }
        
        if (this.registerForm.invalid) {  return; }   // stop here if form is invalid
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

    readUser(){
      let emailId = sessionStorage.getItem("userId");    //console.log('----->'+emailId);   return;
      this.apiService.getUsers(emailId).subscribe((data) => {  this.Users = data;  })  
    }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => { }, (reason) => {   console.log(reason);  });
    }
}