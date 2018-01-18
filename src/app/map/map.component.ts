import { Component, OnInit } from '@angular/core';
import {MouseEvent} from "@agm/core";

@Component({
  selector: 'app-home',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 41.619549;
  lng: number = -93.598022;

  constructor() { }

  ngOnInit() {
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markers: marker[] = [];

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
