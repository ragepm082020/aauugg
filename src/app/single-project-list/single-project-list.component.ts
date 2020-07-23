import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-single-project-list',
  templateUrl: './single-project-list.component.html',
  styleUrls: ['./single-project-list.component.css']
})
export class SingleProjectListComponent {

  constructor() { }
}

$(document).ready(function () {
  $('.list-unstyled li').removeClass('active');
  $('.list-unstyled li:last').addClass('active');
  
});
