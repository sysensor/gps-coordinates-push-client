import {Component, OnInit} from "@angular/core";
import {MouseEvent} from "@agm/core";
import {TokenService} from "../service/token-service";

@Component({
  selector: 'app-home',
  providers: [TokenService],
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 41.5739;
  lng: number = -93.6867;

  constructor(private _service: TokenService) {
  }

  ngOnInit() {
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  removeMarker(index) {
    this.markers.splice(index, 1);
  }

  pushGPSC() {
    this.markers.forEach((marker) => {
      console.log(marker);
      this._service.pushGPSCoordinatesToBackEnd(marker);
    })

    this.markers = [];
  }

  getGPSC() {
    let res = this._service.getGPSCoordinatesFromBackEnd();
    if (res != null) {
      res.subscribe(
        data => {
          console.log(data);
          this.markers.push({
            lat: parseFloat(data.lat),
            lng: parseFloat(data.lng),
            draggable: true
          });

        },
        err => {
          console.log("Error occured on get GPS Coordinates");
        }
      );

    }
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
