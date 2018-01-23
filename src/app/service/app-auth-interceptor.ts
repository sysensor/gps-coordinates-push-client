import {Injectable} from "@angular/core";
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/observable";
import {AppConst} from "./app-const";

@Injectable()
export class AppAuthInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq;
    if(req.url.match(AppConst.WSO2_TOKEN_API)){
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Basic RnhGWVRBOGR5cGNmenBVYmtwc3dmTm1xZUo4YTpDcmhJTmhlOENwVDlQY2Y4d2pVbkhRVmdGQVFh')
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
    }else {
       authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem(AppConst.ACCESS_TOKEN).toString())
          .set('Content-Type', 'application/json').set('Accept', 'application/json')
      });
    }
    return next.handle(authReq);
  }
}
