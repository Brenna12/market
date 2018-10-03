import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from "../authentication.service";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { AccountService } from "../account.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {



  user: any;




  constructor(private router: Router, private auth: AuthenticationService, private acc: AccountService) { 

 

  }

  ngOnInit() {

  
  }


  ngAfterViewInit() {

    this.saveAccessToken();

    this.acc.getUserDetails().subscribe(res => {
      // console.log(res);
    });
    // Create function to catch either error or access token
  }


  getParameterByName(name) {
    var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
  
  getAccessToken() {
    return this.getParameterByName('access_token');
  }
  
  getIdToken() {
    return this.getParameterByName('id_token');
  }

  saveAccessToken() {
    let token = this.getAccessToken();
    console.log(token);
    localStorage.setItem('Token', token);

    
    let expirationDate = this.auth.helper.getTokenExpirationDate(token);
    // Save authentication data and update login status subject
    localStorage.setItem('expires_at', JSON.stringify(expirationDate));

    
    
    this.auth.setLoggedIn(true);

 

    this.router.navigate(['/account'])

  }
  
}
