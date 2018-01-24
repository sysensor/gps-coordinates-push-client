import {Component, OnInit} from "@angular/core";
import {MouseEvent} from "@agm/core";
import {TokenService} from "../service/token-service";
import {AppConst} from "../service/app-const";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  providers: [TokenService],
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 41.5739;
  lng: number = -93.6867;
  access_token: string = '';
  token_type: string = '';
  token_expire: string = '';
  token_scope: string = '';
  refresh_token: string = '';
  app_error: string = '';

  constructor(private _router: Router, private _service: TokenService) {
  }

  public reloadData() {
    this.access_token = localStorage.getItem(AppConst.ACCESS_TOKEN);
    this.token_type = localStorage.getItem(AppConst.TOKEN_TYPE);
    this.token_expire = localStorage.getItem(AppConst.TOKEN_EXPIRE);
    this.token_scope = localStorage.getItem(AppConst.TOKEN_SCOPE);
    this.refresh_token = localStorage.getItem(AppConst.REFRESH_TOKEN);
    this.app_error = localStorage.getItem(AppConst.APP_ERROR);
  }

  ngOnInit() {
    this.reloadData();
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
    this.reloadData();
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
          localStorage.setItem(AppConst.APP_ERROR, "ERROR GET:" + err.message);
        }
      );
    }
    this.reloadData();
  }

  logout(){
    localStorage.setItem(AppConst.ACCESS_TOKEN, '');
    localStorage.setItem(AppConst.TOKEN_TYPE, '');
    localStorage.setItem(AppConst.TOKEN_EXPIRE, '');
    localStorage.setItem(AppConst.TOKEN_SCOPE, '');
    localStorage.setItem(AppConst.REFRESH_TOKEN, '');
    localStorage.setItem(AppConst.APP_ERROR, '');
    this.reloadData();
  }

  refresh(){
    this.reloadData();
    this.markers = [];
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
