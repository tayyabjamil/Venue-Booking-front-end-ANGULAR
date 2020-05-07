import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import { MyAuthService } from '../myAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css']
})
export class SignUpComponent implements OnInit {
  rformSignup: FormGroup;
  islogedin:false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rformSignup = this.formBuilder.group({
      // userId: new FormControl( [Validators.required]),
      username: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, ]),

    });
  }
  signUp(){
    if (this.rformSignup.valid) {
      this.httpService.createAccount(this.rformSignup.value) .subscribe((res: any) => {
        alert('account created');
        this.router.navigate(['/login']);
      });

  } else {
    alert('invalid form');
  }
  }
}
