import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onlineWedd';

  constructor(

   private httpService: HttpService, private router: Router,  ) {

    }
    public login(){
this.router.navigate(['login']);
    }
   public registerHall(){
      this.router.navigate(['registerHall']);
    }
}
