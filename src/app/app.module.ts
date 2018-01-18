import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import {CommonModule} from "@angular/common";
import {AgmCoreModule} from "@agm/core";


@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent }]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4w0Jd1rAVU3XjQSGPGRPA2vYvwX9KL1E'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
