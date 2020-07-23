import { Component, OnInit } from '@angular/core';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-show-notification-info',
  templateUrl: './show-notification-info.component.html',
  styleUrls: ['./show-notification-info.component.css']
})
export class ShowNotificationInfoComponent implements OnInit {
mailId :any;  mailIdArr:any; notificationsArr : string; mailContent:any; str: String; revisedMailContent:any; msg: string = '';
  constructor() { }

  ngOnInit() {
    this.mailId = sessionStorage.getItem('openMailId');
    this.notificationsArr = JSON.parse(sessionStorage.getItem('notifications'));
    this.mailIdArr = this.mailId.split("##");
    //console.log(this.mailIdArr[1]-1)
    //console.log(sessionStorage.getItem('openMailId'));
    //console.log(JSON.parse(sessionStorage.getItem('notifications')));
    for(var i=0; i< this.notificationsArr.length;i++){
        if(this.mailIdArr[1]-1 == i){
          this.mailContent = [{    fromGroup : this.notificationsArr[i]['fromGroup'],  mailSubject : this.notificationsArr[i]['subject'] ,  draftedDate : this.notificationsArr[i]['draftedDate'] ,  mainContent : this.notificationsArr[i]['mainContent']   }]          
        }
    }
  }
}
