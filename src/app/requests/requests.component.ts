import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from '../http.service';
import { MyAuthService } from '../myAuth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  hallId: string;
  requests: Object;
 userData;
 userDataCar;
 carId;
  requestsCar: Object;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.getuserData();
    this.getRequests(this.hallId);
    this.getuserCars();
  }
  getRequests(hallId){
    this.hallId = hallId;
    this.httpService.getRequests(this.hallId).subscribe(requests => {
      this.requests = requests;

   });
  }
  getRequestsCar(carId){
    this.carId = carId;
    this.httpService.getRequestsCar(this.carId).subscribe(requests => {
      this.requestsCar = requests;

   });
  }
  getuserData() {
    this.httpService.getUserData().subscribe((userData) => {
      this.userData = userData;
      // this.title = this.campaignData.startCampaigns[0].title;
      // this.id = this.campaignData._id;
    });
  }
  getuserCars() {
    this.httpService.getUserCars().subscribe((userData) => {
      this.userDataCar = userData;
      // this.title = this.campaignData.startCampaigns[0].title;
      // this.id = this.campaignData._id;
    });
  }
  accept(){
    alert('request accepted');
  }
}
