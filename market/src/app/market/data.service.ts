import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { DATA } from '../mock-data';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';


@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getData(): Promise<any>{
    return Promise.resolve(DATA)
  }

  getAllScenarios() {


    return this.http.get(environment.resources.allScenarios);

  }
  
  getUserScenarios() {

    let user = JSON.parse(localStorage.getItem('User'));


    return this.http.get(environment.resources.scenarioUrl, {
      params: {
          user_id: user.user_id
        }
      });

  }
  getRemoteData(url): Observable<any>{
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
