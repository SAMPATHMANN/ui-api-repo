import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { NgComponentOutlet } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProfileServiceService } from './profile-service.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemEntryTypeEnum } from './Models/SystemEntryTypeEnum';
import { ChildTestComponent } from './child-test/child-test.component';
import {DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { AppService } from './app.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgComponentOutlet, CommonModule, ReactiveFormsModule, FormsModule,
    NgIdleKeepaliveModule,
    ChildTestComponent,
    AppHeaderComponent,
    LoginPageComponent,
    ProfileInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Demomann';
  profile: any;
  showProfileInfo: boolean = false;

  //session TimeOut Code


  constructor(
    private appService: AppService,
    private _idle: Idle,
    private _profileApiService: ProfileServiceService) {

    }

    



  ngOnInit(): void {
    this.SubscribeIdle(this._idle, 180);
  }

  public ParentHandleProfileInfoClickEvent = (param: any) => {
    console.log(`Call Back Test - Message From Child - ${param}`)
    this.showProfileInfo = param && (<Boolean>param.showProfileInfo);
  }

  public ProfileAuthenticationEventCallBack = (param: any): void => {
    if (param && param.obj && param.type)
      switch (param.type) {
        case SystemEntryTypeEnum.Login:
          this._profileApiService.GetProfiles(0, 10,param.obj.Email, param.obj.Password, true).subscribe(
            {
              next: (r) => {
                console.log(r);
                this.profile = r;
                this._idle.watch();

              },
              error: (e) => {
                console.log(e);
              }
      
            });
          break;
        case SystemEntryTypeEnum.Register:
        case SystemEntryTypeEnum.ForgotPassword:
          this._profileApiService.SaveProfile(param).subscribe(
            {
              next: (r) => {
                console.log(r);
                this.showProfileInfo = true

              },
              error: (e) => {
                console.log(e);
              }

            });
          break;
        default:
          break;


      }



        //Test Purpose
  // parentCallText="";

  // callChild(){
  //   // debugger;
  //   this.parentCallText ="Parent Calling";
  //   this.profile = {
  //     name: "Sampath"
  //   }
  // }
  }


  private SubscribeIdle(_idle: Idle, timeinSeconds: number) {
    _idle.setIdle(20);
    _idle.setTimeout(20);
    _idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    _idle.onIdleStart.subscribe(() => {
      // show the modal
    });
    _idle.onIdleEnd.subscribe(() => {
      // hide the modal
    });
    _idle.onTimeoutWarning.subscribe((secondsLeft: number) => {
      // Update the warning message
    });
    _idle.onTimeout.subscribe(() => {
      // Hide the modal, log out, do something else
      this.profile = null;
    });
  }
}
