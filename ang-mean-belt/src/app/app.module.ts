import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AllAnimalsComponent } from './all-animals/all-animals.component';
import {RouterModule, Routes} from "@angular/router";
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {DataManagerService} from "./data-manager.service";
import { HomeComponent } from './home/home.component';
import { AdoptComponent } from './adopt/adopt.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { RegisterComponent } from './register/register.component';
import { PetFormComponent } from './pet-form/pet-form.component';


// const appRoutes: Routes = [
//   { path: 'shelter', component: AppComponent },
//   // { path: 'hero/:id',      component: HeroDetailComponent },
//   {
//     path: 'animals',
//     component: AllAnimalsComponent,
//     data: { title: 'All the Animals' }
//   },
//   { path: '',
//     redirectTo: '/heroes',
//     pathMatch: 'full'
//   },
//   // { path: '**', component: PageNotFoundComponent }
//   { path: '**', component: AppComponent }
// ];


// const appRoutes: Routes = [
//   { path: '', component: AppComponent },
//   { path: '**', component: AppComponent }
// ];


@NgModule({
  declarations: [
    AppComponent,
    AllAnimalsComponent,
    HomeComponent,
    AdoptComponent,
    DetailsComponent,
    EditComponent,
    RegisterComponent,
    PetFormComponent
  ],
  imports: [
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [DataManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
