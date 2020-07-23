import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.css']
})
export class SideNavMenuComponent implements OnInit {
  public myHref: string = ""; chkPageArr:any = []; isVisible:boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    var queryString = window.location.href;
    this.chkPageArr = queryString.split('/');
    
    if(this.chkPageArr[3]=='projectIssues' || this.chkPageArr[3]=='user' || this.chkPageArr[3]=='timeline' || this.chkPageArr[3]=='notification' || this.chkPageArr[3]=='viewIssue' ){
      this.isVisible = true;
    }
   } 

}

$(document).ready(function () {

  var $listItems = $('ul.components li');
  $listItems.removeClass('active');     //$(this).addClass('active'); 
  showActiveMenu();  
  let chkPageArr = [];


  $('#sidebarCollapse').on('click', function () { 
      $('#sidebar').toggleClass('active');

      if($('#sidebar').hasClass('active')){        
        $('.menuLbl').css('display', 'none');
        $('.menubgImg').css('width','100%');
        $('.menubgImg').css('margin-bottom','30px');
        $('.homeImgClr, .projectsImgClr,.profileImgClr,.timelineImgClr,.notifyImgClr').css('background-position','100%');    
        $('ul.components li').css('background','none');
      } else {        
        $('.menubgImg').css('width','23%');
        $('.menuLbl').css('display', 'inline');
        showActiveMenu();
      }
  });  
  
  function showActiveMenu(){     
    var pathname = window.location.pathname;  
    if(pathname=='/dashboard'){             $('.menuDashboard').css('background','#66ccff');   }  
    //else if (pathname=='/projectsList'){    $('.menuProjList').css('background','#66ccff');    }  
    else if (pathname=='/user'){            $('.menuUser').css('background','#66ccff');        }  
    else if (pathname=='/timeline'){        $('.menuTimeline').css('background','#66ccff');    } 
    else if (pathname=='/notification'){    $('.menuNotify').css('background','#66ccff');      }
  } 

});