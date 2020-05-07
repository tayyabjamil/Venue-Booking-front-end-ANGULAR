import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

constructor() { }
loggedIn() {
  return !!localStorage.getItem('userId');
}

getID() {
  return JSON.parse(localStorage.getItem('userId'));
}
// setId(){
//   return JSON.parse(localStorage.setItem('userId'));

// }
loggedOut() {
  return localStorage.removeItem('userId');

}
}
