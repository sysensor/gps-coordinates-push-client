import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";


@Injectable()
export class TokenService {
  constructor(private _router: Router, private _http: HttpClient) {
  }

  validateUserLogin(loginData){
    console.log("We are here..."+loginData.username+loginData.password);

    if(loginData.username == 'admin' && loginData.password == 'admin'){
      console.log("We are here...")
      this._router.navigate(['']);
    }
  }

}
