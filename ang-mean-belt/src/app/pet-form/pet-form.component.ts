import { Component, OnInit } from '@angular/core';

import {PetModel} from "../data-manager.service";

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent {

  constructor() { }

  model = new PetModel("", "", "", "", "");

  submitted = false;

  onSubmit() {
    this.submitted = true;

  }

  get diagnostic() {
    return JSON.stringify(this.model);}
}
