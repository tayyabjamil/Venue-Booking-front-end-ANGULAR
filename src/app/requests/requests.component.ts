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
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.getuserData();
  }
  getRequests(hallId){
    this.hallId = hallId;
    this.httpService.getRequests(this.hallId).subscribe(requests => {
      this.requests = requests;

   });
  }
  getuserData() {
    this.httpService.getUserData().subscribe((userData) => {
      this.userData = userData;
      // this.title = this.campaignData.startCampaigns[0].title;
      // this.id = this.campaignData._id;
    });
  }
}
