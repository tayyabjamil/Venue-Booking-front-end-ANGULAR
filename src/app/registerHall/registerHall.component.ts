import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { HttpService } from "../http.service";
import { MyAuthService } from "../myAuth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-registerHall",
  templateUrl: "./registerHall.component.html",
  styleUrls: ["./registerHall.component.css"],
})
export class RegisterHallComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router
  ) {}
  rform: FormGroup;
  images;
  name;
  adress;
  contact;
  about;
  mainImage;
  userId;
  location;
  multipleImages;
  toppings = new FormControl();
  toppingList: string[] = [
    "Siting 100",
    "Siting 300",
    "Siting 100",
    "Wifi",
    "Parking",
    "Decoration",
    "DJ",
    "PhotoGrapher",
  ];

  ngOnInit() {
    this.userId = this.auth.getID();
    this.userId = this.userId;
    this.rform = this.formBuilder.group({
      userId: new FormControl(this.userId, [Validators.required]),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),

      location: new FormControl(this.location, [Validators.required]),
      startBookingAmount: new FormControl("", [Validators.required]),
      contact: new FormControl("", [Validators.required]),
      services: new FormControl("", [Validators.required]),
      about: new FormControl("", [
        Validators.required,
        Validators.minLength(30),
      ]),
      mainImage: new FormControl("", [Validators.required]),
      multipleImages: new FormControl("", [Validators.required]),
    });
  }
  selectVenueImage(event) {
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
  registerHall() {
    const rform = new FormData();
    rform.append("mainImage", this.images);
    if (this.rform.valid) {
      this.httpService.registerHall(this.rform).subscribe((campaignData) => {
        alert("Venue Registered");
        this.router.navigate(["/home"]);
      });
    } else {
      alert("form is invalid");
    }
  }
}
