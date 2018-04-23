import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-all-animals',
  templateUrl: './all-animals.component.html',
  styleUrls: ['./all-animals.component.css']
})
export class AllAnimalsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  navHome() {
    this.router.navigateByUrl('/home');

  }
}
