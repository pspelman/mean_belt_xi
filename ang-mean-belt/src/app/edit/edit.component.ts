import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import {DataManagerService} from "../data-manager.service";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  // public selected_pet: any;



  pet_id: any;
  // selected_pet: any;
  pet_data: any;
  pet_name: string = "poopy the frog";
  description: string;
  skill_one: string="";
  skill_two: string="";
  skill_three: string="";
  skills: Array<any>;
  // error_list: any;

  selected_pet = {
    pet_id: null,
    pet_name: null,
    type: null,
    description: null,
    skills: [this.skill_one, this.skill_two, this.skill_three]
  };


  public id;
  newTask: any;
  newPet: any;
  backend_errors: any;

  constructor(private _http: DataManagerService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.pet_id = params['pet_id'];
      console.log(`Grabbed the pet id: `,this.pet_id);
    });
  }

  logChange(change_item: HTMLInputElement) {
    console.log(`Item changed: `,change_item);
    console.log(`ViewModel: `,change_item['viewModel']);
  }

  ngOnInit() {
    //it doesn't make tons of sense to go look up the pet in the DB, but maybe someone already adopted it
    //so make a new request for that pet


    //  todo: get info for the pet that was selected
    let observable = this._http.getPetById(this.pet_id);
    observable.subscribe(data => {
      console.log(`Query for specific pet returned: `,data);
      this.pet_data = data['pet'][0];
      this.selected_pet.pet_id = data['pet'][0]._id;
      this.selected_pet.pet_name = data['pet'][0].pet_name;
      this.selected_pet.type = data['pet'][0].type;
      this.selected_pet.description = data['pet'][0].description;
      this.selected_pet.skills[0] = data['pet'][0].skills[0].skill;
      this.selected_pet.skills[1] = data['pet'][0].skills[1].skill;
      this.selected_pet.skills[2] = data['pet'][0].skills[2].skill;



      // this.skill_one = data['pet'][0]['skills'][0].skill;
      // this.skill_two = this.selected_pet['skills'][1].skill;
      // this.skill_three = this.selected_pet['skills'][2].skill;

      //TODO: get skills unwrap skills from the array skills[{_id:"", skill:""}]

    });

    // console.log(`initiating request for id: `,this.pet_id);
    // let single_pet = this._http.getPetById(this.pet_id);
    // single_pet.subscribe(data => {
    //   console.log(`pet query returned: `,data);
    //   this.pet_data = data;
    //   this.selected_pet = data['pet']
    // });

  }

  updatePet() {
    this.backend_errors = null;
    console.log(`trying to update pet`,);
    console.log(``,this.selected_pet);
    let observable = this._http.updatePetInfo(this.selected_pet);
    observable.subscribe(response => {
      console.log(`response from update request: `,response);


      if (!response['errs'].has_errors){
        console.log(`no errors!`,);
        this.router.navigateByUrl('/home');

      } else if (response['errs'].has_errors){
        this.backend_errors = response['errs'].err_list;
        console.log(`got backend errors`,this.backend_errors);
        // this.error_list = response['errs'].error_list;
      }

    });

  }



  // cancelEditRequest() {
  //   console.log(`cancel edit`,);
  //   this.router.navigateByUrl(`/details/${this.pet_id}`)
  //
  // }
  public cancelEditRequest(pet_id) {
    // this.router.navigate(['/registration', this.parVal])
    this.router.navigate(['/details', pet_id])
  }
  navHome() {
    this.router.navigateByUrl('/home');

  }

  //the pet id is going to be used to edit the pet attributes



}
