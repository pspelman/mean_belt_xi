import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {DataManagerService} from "../data-manager.service";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public selected_pet: any;
  pet_id: any;

  // constructor(private _http: DataManagerService, private route: Router, private activatedRoute = ActivatedRoute) {
  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) {
    //todo: grab the pet ID from the request
    this.activatedRoute.params.subscribe(params => {
      this.pet_id = params['pet_id'];
      console.log(`Grabbed the pet id: `,this.pet_id);
      // this.ngOnInit();
    });
  }



  ngOnInit() {
  //  todo: get info for the pet that was selected
    let observable = this._http.getPetById(this.pet_id);
    observable.subscribe(data => {
      console.log(`Query for specific pet returned: `,data);
      this.selected_pet = data['pet'][0];
    });
    // this.selected_pet = {'pet':"barney"};
  }

  likeThisPet(pet_id: any) {
   console.log(`recieved like request for #:`,pet_id);
   //try to like the pet
    let observable = this._http.addLike(pet_id);
    observable.subscribe(data => {
      console.log(`response from server: `,data);
    });


  }

  adoptThisPet(_id: any) {
    console.log(`recieved ADOPT request for pet: `,_id);
    let adoption = this._http.adoptPet();
    adoption.subscribe(result => {
      console.log(`adoption result:`,result);
    });

  }
}
