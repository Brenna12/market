import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { AzureService } from "../azure.service";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  url = environment.resources.userApiUrl;
  user: any;
  scenarios;

  constructor(
    private http: HttpClient,
    private storage: AzureService
  ) { }

  ngOnInit() {


    // Get User details from user info api
    this.getUserDetails().subscribe(res => {
      this.user == res;

      console.log(this.user);
      localStorage.setItem('User', JSON.stringify(this.user));
      //   // ...and then with that id, query database for scenarios

      this.getScenarios().subscribe(res => {

        this.scenarios = res;

        console.log(this.scenarios);

      })
    })
  };


  ngAfterViewInit() {



  }
  getScenarios() {

    let user = JSON.parse(localStorage.getItem('User'));


    return this.http.get(environment.resources.scenarioUrl, {
      params: {
        user_id: user.user_id
      }
    })
    // .subscribe(res => {
    //   console.log(res);
    // })

  }

  // getAllBlobsList(id: any) {
  //   let data = this.http.get("http://localhost:8000/scenarios/" + id).toPromise().then(res => {
  //     console.log(res);

  //   });


  // }
  public getUserDetails(): Observable<any> {


    return this.http.get(this.url)
      .map(res => {
        console.log(res);

        this.user = res;

      })
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();

    console.log(body);
    this.user == body;

    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
