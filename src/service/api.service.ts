import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry,catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUri:string = 'http://localhost:4000/backend';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createProject(data): Observable<any> {    let url = `${this.baseUri}/create`;  return this.http.post(url, data).pipe(catchError(this.errorMgmt))   }
  
  // Get all projects
  getProjects() { return this.http.get(`${this.baseUri}/`);  }

  getAllIssues(): Observable<any>{
    let url =`${this.baseUri}/projIss/`;
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  addProjectIssue(data): Observable<any> {    let url = `${this.baseUri}/projIss/create`;  return this.http.post(url, data).pipe(catchError(this.errorMgmt))   }

  getSpecifyProjectIssues(projId): Observable<any> {
    let url = `${this.baseUri}/projIss/projectId/${projId}`;     
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  getTotalIssues(projId): Observable<any> {
    let url = `${this.baseUri}/projIss/totalCnt/${projId}`;     
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  getAllTotalIssues(projIds): Observable<any> {
    let url = `${this.baseUri}/projIss/listAll/${projIds}`;     
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }
  
  getClosedIssues(projId): Observable<any> {
    let url = `${this.baseUri}/projIss/closedCnt/${projId}`;     
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  getusersAssignedIssues(projId): Observable<any> {
    let url = `${this.baseUri}/projIss/listAssignedUsers/${projId}`;     
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  getAllIssueActivities(projId): Observable<any>{
    let url =`${this.baseUri}/issueActivity/getActivities/projectId/${projId}`;
    console.log(url)
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  // Get all projects
  getAllUsers(): Observable<any> {
    let url = `${this.baseUri}/user/`; 
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  getUsers(id): Observable<any> {
    let url = `${this.baseUri}/user/readStr/${id}`; 
    //console.log(url);
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  getIssueList(projectCode): Observable<any> {
    let url = `${this.baseUri}/projIss/read/${projectCode}`; 
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

   // Update employee
   updateProjectIssues(id, statusData): Observable<any> {
    let url = `${this.baseUri}/projIss/update/${id}`;  
    let data = { "issueStatus": statusData};
    return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt))
  }  

  addProjectIssueActivty(data): Observable<any> {
    console.log(data)
    let url = `${this.baseUri}/issueActivity/create`;
    return this.http.post(url, data
      ).pipe(catchError(this.errorMgmt)
    );
  }

  addNotification(data): Observable<any> {
    console.log(data)
    let url = `${this.baseUri}/notify/create`;
    return this.http.post(url, data
      ).pipe(catchError(this.errorMgmt)
    );
  }

  getAllNotifications(){
    let url =`${this.baseUri}/notify/`;
    return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))
  }

  // Get employee
  getProject(id): Observable<any> {    let url = `${this.baseUri}/read/${id}`; return this.http.get(url, {headers: this.headers}).pipe(  map((res: Response) => { return res || {} }), catchError(this.errorMgmt))   }

  // Update employee
  updateProject(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;  return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt))
  }

  // Delete employee
  deleteProject(id): Observable<any> {    let url = `${this.baseUri}/delete/${id}`;    return this.http.delete(url, { headers: this.headers }).pipe(catchError(this.errorMgmt))  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){ errorMessage = error.error.message;/* Get client-side error*/    } 
    else                                  { errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; /*get server-side error*/ }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}