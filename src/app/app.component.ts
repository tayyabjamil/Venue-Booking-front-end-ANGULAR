import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { MyAuthService } from './myAuth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onlineWedd';
  islogedin = false;
  constructor(

   private httpService: HttpService, private router: Router, public authService: MyAuthService  ) {

    }
    public login(){
this.router.navigate(['login']);

}
   public registerHall(){
      this.router.navigate(['registerHall']);
    }
    onLogoutClick() {
      this.authService.loggedOut();
      this.router.navigate(['home']);
      alert('account logged out')
    }
}
