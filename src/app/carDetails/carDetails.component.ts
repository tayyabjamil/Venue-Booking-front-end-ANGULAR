import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MyAuthService } from '../myAuth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carDetails',
  templateUrl: './carDetails.component.html',
  styleUrls: ['./carDetails.component.css']
})
export class CarDetailsComponent implements OnInit {
  hallId: any;
 rform: FormGroup;
carId;
  multipleImages;
details;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = (this.route.snapshot.paramMap.get('id'));
    this.carId = id;
    this.rform = this.formBuilder.group({
      registerCarId: new FormControl(this.carId, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),

      phone: new FormControl('', [Validators.required]),

      date: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),

    });

    this.carDetails();
  }

  sendRequestCar(){
    if (this.rform.valid) {
    this.httpService.createRequestCar(this.rform).subscribe(() => {
      alert('request Sent ');
      this.router.navigate(['/home']);
    });

  }

    else {
      alert('invalid form');
    }
  }

  carDetails() {
    this.httpService.getCarDetails(this.carId).subscribe(res => {

      this.details = res;
      this.multipleImages = this.details.multipleImages;

    });
  }

}
