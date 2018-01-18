import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lat: number = 41.619549;
  lng: number = -93.598022;

  constructor() { }

  ngOnInit() {
  }
}
