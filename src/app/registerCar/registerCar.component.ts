import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import { MyAuthService } from '../myAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerCar',
  templateUrl: './registerCar.component.html',
  styleUrls: ['./registerCar.component.css']
})
export class RegisterCarComponent implements OnInit {
  userId: any;
  rform: FormGroup;
  location: any;
images;
about;
multipleImages;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.auth.getID();
    this.userId = this.userId;
    this.rform = this.formBuilder.group({
      userId: new FormControl(this.userId, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      location: new FormControl(this.location, [Validators.required]),
      amount: new FormControl('', [Validators.required, ]),
      contact: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required, Validators.minLength(30)]),

      mainImage: new FormControl("", [Validators.required]),
      multipleImages: new FormControl("", [Validators.required]),
    });
  }
  selectCarImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.images = file;
      this.rform.controls["mainImage"].setValue(this.images.name);
    }

}
selectMultipleImage(event) {
  if (event.target.files.length > 0) {
    this.multipleImages = event.target.files;
    const imagesNames = [];
    for (let index = 0; index <= (this.multipleImages.length - 1); index++) {
       imagesNames.push(this.multipleImages[index].name);
    }

    this.rform.controls["multipleImages"].setValue(imagesNames);
  }
}
registerCar(){
  const rform = new FormData();
  rform.append("mainImage", this.images);
  if (this.rform.valid){

      this.httpService.registerCar(this.rform).subscribe( campaignData => {
          alert('Car Registered');
          this.router.navigate(['/home']);
      });
      }
    else{
      alert('form is invalid');
    }
      }
}


