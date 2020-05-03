import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyAuthService } from './myAuth.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
authService: any;

constructor(
  private http: HttpClient,
  private myauthService: MyAuthService
   ) { }
httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'Application/Json',
    accept: ' application/json'
  })
};
login(user) {
  return this.http.post(
    'http://localhost:3001/userAccount/login',
    {
      email: user.email,
      password: user.password
    },
    this.httpHeaders
  );
}
createAccount(newUser) {

  return this.http.post(
    'http://localhost:3001/userAccount/signUp',
    {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    },
    this.httpHeaders
  );
}
getUserData() {
  return this.http.get('http://localhost:3001/registerHall/' + this.myauthService.getID(), this.httpHeaders);

}
registerHall(hallData) {
  return this.http.post(
    'http://localhost:3001/registerHall/',       {

      userAccountId: hallData.value.userId,
      name: hallData.value.name,
      email: hallData.value.email,
      location: hallData.value.location,
      startBookingAmount: hallData.value.startBookingAmount,
      about: hallData.value.about,
      contact: hallData.value.contact,
      services: hallData.value.services,
      mainImage: hallData.value.mainImage,
    },
    this.httpHeaders
  );
}
createRequest(requestData) {
  return this.http.post(
    'http://localhost:3001/booking',
    {
        name: requestData.value.name,
        email: requestData.value.email,
        guests: requestData.value.guests,
        eventType: requestData.value.eventType,
        phone: requestData.value.phone,
        registerHallId: requestData.value.registerHallId,
        city: requestData.value.city
    },
    this.httpHeaders
  );
}
getRequests(id) {
  return this.http.get('http://localhost:3001/booking/' + id,   this.httpHeaders);
}
getAllVenues() {
  return this.http.get('http://localhost:3001/registerHall/', this.httpHeaders);
}
getHallDetails(id) {
  return this.http.get('http://localhost:3001/registerHall/hallDetails/' + id,   this.httpHeaders);
}
}
