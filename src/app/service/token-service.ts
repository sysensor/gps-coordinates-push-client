import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Cookie} from "ng2-cookies/src/cookie";


@Injectable()
export class TokenService {
  constructor(private _router: Router, private _http: HttpClient) {
  }

  validateUserLogin(loginData) {
    console.log("We are here..." + loginData.username + loginData.password);

    if (loginData.username == 'jon' && loginData.password == 'jon123') {
      console.log("We are here...")
      this._router.navigate([''])
    }


    // var expireDate = new Date().getTime() + (3600);
    // Cookie.set("access_token", loginData.accessToken, expireDate);
    // console.log('Obtained Access token');
    // this._router.navigate(['/']);

  }

  pushGPSCoordinatesToBackEnd(gpsData) {
    console.log("GPS - {lat:" + gpsData.lat + ", long:" + gpsData.lng + "}");

    //this._http.post("",gpsData,options);

    const req = this._http.post('https://localhost:8243/gps/api/signal', {
      lat: '21212', lng: '1212'
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }

}
