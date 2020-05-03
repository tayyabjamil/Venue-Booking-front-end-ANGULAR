import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

constructor() { }
// loggedIn() {
//   return !!localStorage.getItem('token');
// }

getID() {
  return JSON.parse(localStorage.getItem('userId'));
}
// setId(){
//   return JSON.parse(localStorage.setItem('userId'));

// }
loggedOut() {
  return localStorage.removeItem('token');

}
}
