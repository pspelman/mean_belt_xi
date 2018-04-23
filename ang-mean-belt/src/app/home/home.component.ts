import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {DataManagerService} from "../data-manager.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _http: DataManagerService) { }

  title = "These pets are looking for a home";
  public pet_list: any;
  public parVal: any;
  public pet_id: any;

  //FIXME: SET TEMPORARY PET ID to "5adbcb0c09ab2853b4beb439"

  public temp_pet_id = "5adbcb0c09ab2853b4beb439";



  ngOnInit() {
    //todo: ask for new petlist and subscribe to it
    let observable = this._http.getPets();
    observable.subscribe(data => {
      console.log(`data returned: `,data);
      console.log(`recieved petlist: `, data['pets']);
      this.pet_list = data['pets'];
      console.log(`pet_list: `,this.pet_list);
      }
    );
  }

  public navSortedAnimalsPage() {
    this.router.navigateByUrl('/sorter')
  }

  public setValue(id: string){
    console.log(`setting ID value to `,id);
    this.parVal = id;
    this.pet_id = id;
  }

  public navRegistration() {
    // this.router.navigate(['/registration', this.parVal])
    this.router.navigate(['/registration', this.parVal])
  }
  //todo: get the overall pet list to make the pet table


  navEditPet(pet_id: string) {
    console.log(`pressed button to nav to edit pet: `, pet_id);
    this.pet_id = pet_id;
    this.router.navigate(['/edit', this.pet_id]);

  }
}
