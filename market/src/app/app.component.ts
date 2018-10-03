import { Component, OnInit } from '@angular/core';
import {NavBarComponent} from './nav-bar/nav-bar.component'
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  constructor(){

    let apiUrl = environment.resources.userApiUrl;

  console.log(apiUrl);

  }

}
