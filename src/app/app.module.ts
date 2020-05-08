import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HallDetailsComponent } from './hallDetails/hallDetails.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterHallComponent } from './registerHall/registerHall.component';
import { TextFieldComponent } from './textField/textField.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyAuthService } from './myAuth.service';
import { SignUpComponent } from './signUp/signUp.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { RequestsComponent } from './requests/requests.component';
import { RegisterCarComponent } from './registerCar/registerCar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CarDetailsComponent } from './carDetails/carDetails.component';
@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      HallDetailsComponent,
      LoginComponent,
      RegisterHallComponent,
      TextFieldComponent,
      SignUpComponent,
      RequestsComponent,
      RegisterCarComponent,
      CarDetailsComponent
   ],
   imports: [
      BrowserModule,
      CommonModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatIconModule,
      MatSelectModule,
      MatDatepickerModule
   ],
   providers: [
      MyAuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
