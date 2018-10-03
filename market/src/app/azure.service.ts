import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AzureService {

  constructor(
    private http: HttpClient
  ){}


  getScenarios(){

    let url = "http://localhost:8000/scenarios";

    return this.http.get(url);
  }

}
