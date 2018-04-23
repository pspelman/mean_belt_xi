import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllAnimalsComponent} from "./all-animals/all-animals.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {DetailsComponent} from "./details/details.component";
import {RegisterComponent} from "./register/register.component";
import {EditComponent} from "./edit/edit.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'details', component: DetailsComponent },
  {path: 'details/:pet_id', component: DetailsComponent },
  {path: 'sorter', component: AllAnimalsComponent},
  // {path: 'edit/:parVal', component: EditComponent},
  {path: 'edit/:pet_id', component: EditComponent},
  // {path: 'registration/:parVal', component: RegisterComponent},
  {path: 'registration', component: RegisterComponent},
  // {path: '', component: HomeComponent},
  {path: '', component: HomeComponent},
  // {path: 'details', pathMatch: 'exact', component: DetailsComponent },


  // {
  //   path: '',
  //   component: AppComponent,
  //   data: {component: AllAnimalsComponent}
  // },
  // {
  //   path: '',
  //   redirectTo: 'animals',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'animals',
  //   component: AllAnimalsComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'x',
  //       pathMatch: 'full'
  //     }
  //   ]
  // },
  // {
  //   path: '**',
  //   component: AppComponent
  // }

  // {path: '', component: AppComponent},
  //
  //
  //
  // {path: '**', component: AppComponent},
  // {path: '', component: AppComponent}
  // {path: '', component: AppComponent}


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
