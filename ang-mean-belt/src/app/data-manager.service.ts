import { Injectable } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";


@Injectable()
export class PetModel {

  constructor(
    // public id?: any,
    public pet_name: string,
    public description: string,
    public skill_one?: any,
    public skill_two?: any,
    public skill_three?: any,
  ) { }

}





@Injectable()
export class DataManagerService {

  constructor(private _http: HttpClient) {

  }

  //
  // all_pets_list: Array<any>;
  // selected_pet: any;


  //TODO: get all pets from server
  getPets() {
    return this._http.get('/pets');

  }

  addLike(pet_id: any) {
    console.log(`making HTTP request to like pet`,);
    return this._http.put(`/pets/like/${pet_id}`, {'add_likes':1});
  }

  //TODO: get ONE specific pet from server
  getPetById(pet_id){
    //sample _id: "5ace53db9e53309f623dfb04"
    console.log(`sending http request for petID: `,pet_id);
    return this._http.get(`/pets/${pet_id}`);

  }

  //TODO: create a pet
  addPet(newPet){
    let url = `/pets`;

    return this._http.post(url, newPet);

  }


  //TODO: edit a pet


  //TODO: delete a pet


  // TODO: like a pet on the server
  // likePet(pet) {
  //   this._http.put('/like/',{"animal goes here":"THING"} );
  // }


  adoptPet() {
    console.log(`trying to adopt pet`,);

  }
}
