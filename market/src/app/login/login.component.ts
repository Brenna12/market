import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUrl: string;
  constructor() { 

    let authUrl = environment.authentication.authUrl;
    let cid = environment.authentication.client_id;
    let redirect = environment.authentication.redirect_uri;
    let scope = environment.authentication.scope;
    let res = environment.authentication.response_type;


    this.loginUrl = authUrl + '?client_id=' + cid + '&redirect_uri=' + redirect + '&response_type=' + res + '&scope=' + scope;

  }

  ngOnInit() {

    console.log(this.loginUrl);
  }

}
