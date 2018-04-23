import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import {PetFormComponent} from "../pet-form/pet-form.component";
import {DataManagerService} from "../data-manager.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  new_pet: any;
  pet_name: string = "poopy the frog";
  description: string;
  skill_one: string="";
  skill_two: string="";
  skill_three: string="";
  skills: Array<any>;
  error_list: any;
  backend_errors: any;

  public id;
  newTask: any;
  newPet: any;

  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      // this.id = params['parVal'];
      this.id = 'temp_id_from_url';
    });
  }

  ngOnInit() {
    this.new_pet = {
      pet_name: '',
      type: '',
      description: '',
      skills: [this.skill_one, this.skill_two, this.skill_three]
    };

  }

  logChange(change_item: HTMLInputElement) {
    console.log(`Item changed: `,change_item);
    console.log(`ViewModel: `,change_item['viewModel']);
  }

  //TODO: On form submission, attempt to save the pet to the db

  //TODO: Disable automatically refreshing the page on form submit

  //TODO: process the response from the DB for errors from the db

  //TODO: if there were errors from the DB, save them in backend_errors and DO NOT navigate elsewhere

  //TODO: if the pet saved, THEN navigate back to the home page


  createNewPet(){
    console.log(`trying to create pet with data from form :`,this.new_pet);
    this.backend_errors = null;

    if (this.validateForm()) {
      let observable = this._http.addPet(this.new_pet);
      let router = this.router
      observable.subscribe(function (response) {
        console.log(`Tried to register new pet. Server response: `,response);
        if (!response['errs'].has_errors){
          console.log(`no errors!`,);
          router.navigateByUrl('/home');

        } else if (response['errs'].has_errors){
          this.backend_errors = response['errs'].err_list;
          console.log(`got backend errors`,this.backend_errors);
          // console.log(`there were errors!`,response['errs'].error_list);
          // this.error_list = response['errs'].error_list;
        }

      });

    } else {
      alert('you must finish entering data in the form');
    }

    // this.new_pet.skills = [this.skill_one, this.skill_two, this.skill_three];
  }

  // navigateHome() {
  //   this.router.navigate(['/home']);
  //
  // }


  toggle_completed_status() {
    console.log(`this is the toggle status`,);
  }

  validateForm() {
    console.log(`checking form for valid inputs`,);
    if (this.new_pet.pet_name.length &&
      this.new_pet.description.length &&
      this.new_pet.type.length) {
      console.log(`invalid form data`,);
      return true;
    } else {
      console.log(`valid form data`,);
      return false;
    }
    //name

    //type
    //details
    //

  }

  navHome() {
    this.router.navigateByUrl('/home');

  }
}
