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
date;
requests
  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = (this.route.snapshot.paramMap.get('id'));
    this.hallId = id;
    this.rform = this.formBuilder.group({
      registerHallId: new FormControl(this.hallId, [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(10)]),

      phone: new FormControl('', [Validators.required]),
      guests: new FormControl('', [Validators.required, ]),
      eventType: new FormControl('', [Validators.required]),
      date: new FormControl('', ),
      city: new FormControl('', ),

    });
    this.HallDetails();

  }

  sendRequest(){

    this.httpService.createRequest(this.rform).subscribe(() => {
      alert('request Sent ');
    });

  }
  HallDetails() {
    this.httpService.getHallDetails(this.hallId).subscribe(details => {

      this.doc = details;
      this.services= this.doc.services;
    });
  }
}




