import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterHallComponent } from './registerHall/registerHall.component';
import { HallDetailsComponent } from './hallDetails/hallDetails.component';
import { SignUpComponent } from './signUp/signUp.component';
import { RequestsComponent } from './requests/requests.component';
import { AuthGuard } from './auth.guard';
import { RegisterCarComponent } from './registerCar/registerCar.component';
import { CarDetailsComponent } from './carDetails/carDetails.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registerHall', component: RegisterHallComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'request', component: RequestsComponent },
  { path: 'registerCar', component: RegisterCarComponent},
  { path: 'hallDetails/:id', component: HallDetailsComponent },
  { path: 'carDetails/:id', component: CarDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
