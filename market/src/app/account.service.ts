import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

currentUser: any;


  getUserDetails(): Observable<any>{
    return this.http.get("https://passport.gen4.info/api/userinfo")
                    .map(res => {
                      console.log(res);

                      localStorage.setItem('User', JSON.stringify(res));

                    })
                    .catch(this.handleError);
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
