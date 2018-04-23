import { Component, Input, Output, OnInit } from '@angular/core';
// import {HttpService} from "./http.service";
import { Router, Event, NavigationStart } from '@angular/router';


import {ActivatedRoute} from "@angular/router";
import {DataManagerService} from "./data-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `<!--this is the base route-->`,
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'ANIMAL SHELTER';

  constructor(private _http: DataManagerService) { }

  ngOnInit(): void {
    console.log(`arrived at main component`,);

  }



}
