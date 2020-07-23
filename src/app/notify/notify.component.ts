import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from './../../service/api.service';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ShowNotificationInfoComponent} from './../show-notification-info/show-notification-info.component';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  notifyObj:any=[]; notificationsObj: any; classContent:any;
  constructor(private modalService: NgbModal, public _router:Router,private apiService: ApiService, public _location:Location) { }

  ngOnInit() {
    this.apiService.getAllNotifications().subscribe((data) => {
      this.notificationsObj = data;  console.log(this.notificationsObj)      
    });   
  }
  
  open(content, event, actionVal) {  
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.attributes.id.value;    
      if(actionVal=='openNotify'){
        sessionStorage.setItem('openMailId',idAttr);
        sessionStorage.setItem('notifications',JSON.stringify(this.notificationsObj))
        const modalRef = this.modalService.open(ShowNotificationInfoComponent,{ windowClass : "myCustomModalClass"});
      }
      else if(actionVal=='addNotification'){        
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {   }, 
        (reason) => {   /*console.log(reason); */   });
      }
      
    }
    openNotifications(content){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {   }, 
        (reason) => {   /*console.log(reason); */   });
    }

    onSubmitNotify(event: any){
      let msgSubject = event.target.notifySubject.value;
      let msgData =  event.target.notifyMessage.value; 
      //var dateTimeNow = dateNow.getFullYear()+"-"+('0' + (dateNow.getMonth()+1)).slice(-2)+"-"+('0' + dateNow.getDate()).slice(-2)+"T"+dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds()+"Z";
      var dateTimeNow ='2020-03-07T10:11:30Z';
      let addNotificationData ={ fromGroup:'Product Owner',ccEmailIds: '',subject :msgSubject,mainContent: msgData, draftedDate: dateTimeNow};         
      this.apiService.addNotification(addNotificationData).subscribe((res) => {
         console.log('Notification successfully created!')        
       }, (error) => {
         console.log(error);
       });
       this.modalService.dismissAll();
       //this._router.navigateByUrl('/notification');
       /*this._router.navigateByUrl("/notification", { skipLocationChange:false}).then(() => {
         console.log(decodeURI(this._location.path()))
         this._router.navigate([decodeURI(this._location.path())]);
        }); */
        location.href='/notification'
    }
        
  }