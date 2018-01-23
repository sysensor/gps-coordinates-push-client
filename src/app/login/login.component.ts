import {Component} from "@angular/core";
import {TokenService} from "../service/token-service";

@Component({
  selector: 'login',
  providers: [TokenService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginData = {username: "", password: "", accessToken:""};

  constructor(private _service: TokenService) {
  }

  login() {
    var status = this._service.validateUserLogin(this.loginData);
  }

}
