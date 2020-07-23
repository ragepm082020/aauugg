import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent } from '../app/app.component';
import { EntryLoginComponent } from '../app/entry-login/entry-login.component';
import { MainDashboardComponent } from '../app/main-dashboard/main-dashboard.component';
import { ProjListComponent } from '../app/proj-list/proj-list.component';
import { SingleProjectListComponent } from '../app/single-project-list/single-project-list.component';
import { ProjectIssueListComponent } from '../app/project-issue-list/project-issue-list.component';
import { TimelineComponent } from '../app/timeline/timeline.component';
import { UserProfileComponent } from '../app/user-profile/user-profile.component';
import { NotifyComponent } from '../app/notify/notify.component';
import { ViewIssueComponent } from './view-issue/view-issue.component';
//import {ValidatorFormComponent} from './validator-form/validator-form.component';

const routes: Routes = [
  {
    path: 'dashboard', component: MainDashboardComponent
  }, {
    path: 'projectsList', component: ProjListComponent
  }, {
    path: '', component: EntryLoginComponent
  }, {
    path: 'timeline', component: TimelineComponent
  }, {
    path: 'pp', component: SingleProjectListComponent
  }, {
    path: 'projectIssues/:id', component: ProjectIssueListComponent
  }, {
    path: 'user', component: UserProfileComponent
  }, {
    path: 'notification', component: NotifyComponent
  }, {
    path: 'viewIssue/:id', component: ViewIssueComponent
  }, {
    path: '**', component: EntryLoginComponent 
  },
  /*{    path: 'viewIssue', component: ViewIssueComponent  },{    path:'validForm',    component:ValidatorFormComponent}*/  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
