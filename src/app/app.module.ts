import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';
import { ApiService } from './../service/api.service';//'./service/api.service';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryLoginComponent } from './entry-login/entry-login.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { TopNavMenuComponent } from './top-nav-menu/top-nav-menu.component';
import { SingleProjectListComponent } from './single-project-list/single-project-list.component';
import { ProjectIssueListComponent } from './project-issue-list/project-issue-list.component';
import { DecimalPipe } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import '../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js';
import { ProjListComponent } from './proj-list/proj-list.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NotifyComponent } from './notify/notify.component';
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { ShowNotificationInfoComponent } from './show-notification-info/show-notification-info.component';
//import { ValidatorFormComponent } from './validator-form/validator-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryLoginComponent,
    MainDashboardComponent,
    SideNavMenuComponent,
    TopNavMenuComponent,
    SingleProjectListComponent,
    ProjectIssueListComponent,
    UserProfileComponent,
    ProjListComponent,
    TimelineComponent,
    NotifyComponent,
    ViewIssueComponent,
    ShowNotificationInfoComponent //, ValidatorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
  ],
  entryComponents: [
    ShowNotificationInfoComponent
  ],
  providers: [DecimalPipe, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }