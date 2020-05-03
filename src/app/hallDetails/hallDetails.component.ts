import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { MyAuthService } from '../myAuth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hallDetails',
  templateUrl: './hallDetails.component.html',
  styleUrls: ['./hallDetails.component.css']
})
export class HallDetailsComponent implements OnInit {
rform:FormGroup;
hallId;
name;
email;
phone;
guests;
eventType;
services;
city;
doc;
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router,
    public route: ActivatedRoute
  ) { }
sendRequest(){

}
  ngOnInit() {
    const id = (this.route.snapshot.paramMap.get('id'));
    this.hallId = id;
    this.rform = this.formBuilder.group({
      hallId: new FormControl(this.hallId, [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      city: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, ]),
      phone: new FormControl('', [Validators.required]),
      eventType: new FormControl('', ),
      guests: new FormControl('', ),

    });
    this.HallDetails();
  }
  HallDetails() {
    this.httpService.getHallDetails(this.hallId).subscribe(details => {

      this.doc = details;
      this.services= this.doc.services;
    });
  }
}




