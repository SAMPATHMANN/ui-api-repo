// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { provideHttpClient } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup


@NgModule({
  declarations: [
    AppComponent, 
    AppHeaderComponent,
    LoginPageComponent,
    ProfileInfoComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule
  ],
  providers: [provideHttpClient()], 
  bootstrap: [AppComponent]
})
export class AppModule { }
