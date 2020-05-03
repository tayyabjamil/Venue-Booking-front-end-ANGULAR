import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  allData = [];
  filterData = [];

  constructor(public router: Router, public httpService: HttpService) {}

  ngOnInit() {
    this.getAllprojects();

     // tslint:disable-next-line: comment-format
    //@ts-ignore
    var ps = new ParticleSlider({
      ptlGap: 2,
      mouseForce: 100,
      // monochrome: true,
      // color: '#000',
      ptlSize: 3,
      // sliderId: 'particle-slider',

    });

    var ptl = new ps.Particle(ps);

    // Set time to live of Particle to20 frames.
    ptl.ttl = 5;
  }

  getAllprojects() {
    this.httpService.getAllVenues().subscribe((dataVenues: any) => {
      this.allData = dataVenues;
      this.filterData = dataVenues;
      // this.title=this.allData[0].title
    });
  }
  moreInfo(allData: any) {
    this.router.navigate(["hallDetails/", allData]);
  }
  bookNow() {
    this.router.navigate(["bookNow"]);
  }

  filterVenue(location) {
    this.filterData = [];
    this.allData.forEach((venue) => {
      if (venue.location === location) {
        return this.filterData.push(venue);
      }
    });
  }

  onSelectionChange(args) {
    this.filterVenue(args.value);
  }
   myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

   filterFunction() {

  }
}
