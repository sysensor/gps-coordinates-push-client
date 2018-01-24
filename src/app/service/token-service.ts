import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AppConst} from "./app-const";


@Injectable()
export class TokenService {

  constructor(private _router: Router, private _http: HttpClient) {
  }

  validateUserLogin(loginData) {
    const req = this._http.post<Token>(AppConst.WSO2_TOKEN_API + '?grant_type=password&username=' + loginData.username + '&password=' + loginData.password + '&scope=SCOPE_GPS_PUBLISHER SCOPE_GPS_RECEIVER', null)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem(AppConst.ACCESS_TOKEN, res.access_token);
          localStorage.setItem(AppConst.REFRESH_TOKEN, res.refresh_token);
          localStorage.setItem(AppConst.TOKEN_SCOPE, res.scope);
          localStorage.setItem(AppConst.TOKEN_TYPE, res.token_type);
          localStorage.setItem(AppConst.TOKEN_EXPIRE, res.expires_in.toString());
          localStorage.setItem(AppConst.APP_ERROR,'');
          this._router.navigate(['/']);
        },
        err => {
          console.log("Wrong username and password combination");
          localStorage.setItem(AppConst.ACCESS_TOKEN, '');
          localStorage.setItem(AppConst.TOKEN_TYPE, '');
          localStorage.setItem(AppConst.TOKEN_EXPIRE, '');
          localStorage.setItem(AppConst.TOKEN_SCOPE, '');
          localStorage.setItem(AppConst.REFRESH_TOKEN, '');
          localStorage.setItem(AppConst.APP_ERROR,"Wrong username and password combination");
        }
      );

  }


  pushGPSCoordinatesToBackEnd(gpsData) {
    console.log("GPS - {lat:" + gpsData.lat + ", long:" + gpsData.lng + "}");

    //this._http.post("",gpsData,options);

    const req = this._http.post(AppConst.WSO2_APIM_BASE + '/gps/api/signal', gpsData)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem(AppConst.APP_ERROR,'');
        },
        err => {
          console.log("Error occured in GPS push");
          localStorage.setItem(AppConst.APP_ERROR,"ERROR POST:"+err.message);
        }
      );
  }

  getGPSCoordinatesFromBackEnd() {
    return this._http.get<GPSCoordinates>(AppConst.WSO2_APIM_BASE + '/gps/api/signal');
  }

}

interface GPSCoordinates {
  lat: string;
  lng: string;
}

interface Token {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
}
