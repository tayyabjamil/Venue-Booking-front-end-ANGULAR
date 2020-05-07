import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from '../http.service';
import { MyAuthService } from '../myAuth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = true;
  username;
  email;
  password;
  usernameAccount;
  emailAccount;
  passwordAccount;
  newAccount;

  rform;
  token;
  rformSignup: FormGroup;
  rformLogin: FormGroup;
user;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.rformLogin = this.formBuilder.group({
      // userId: new FormControl( [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, ]),

    });
  }

  signInGoogle(){

  }
  signInFacebook(){

  }
  login(){
    if (this.rformLogin.valid) {
      this.httpService.login(this.rformLogin.value).subscribe((res: any) => {
        this.router.navigate(['home']);

        // this.setToken(res.token);
        this.setId(res.userId);

        this.isLoggedIn = true;
        alert('login succesfully');
      });
    } else {
      alert('invalid form');
    }
}
// setToken(token) {
//   localStorage.setItem('token', JSON.stringify(token));
// }
setId(userId) {
  localStorage.setItem('userId', JSON.stringify(userId));
}
}
