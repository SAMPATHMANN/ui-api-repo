import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { NgComponentOutlet } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ProfileServiceService } from './profile-service.service';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileActionTypeEnum } from './Models/Enums';
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
  apiCallError: any;

  ProfileActionTypes: any;

  private readonly SessionName_Profile = "profile";


  constructor(
    private appService: AppService,
    private _idle: Idle,
    private _profileApiService: ProfileServiceService) {
    }

    

    GetProfileFromSession(){
      const profileFromSession = sessionStorage && sessionStorage.getItem(this.SessionName_Profile);
    if(profileFromSession != null)
      this.profile = JSON.parse(profileFromSession);
    }

  ngOnInit(): void {
    this.SubscribeIdle(this._idle, 60);
    // this.GetProfileFromSession();
    this._profileApiService.GetProfileActionTypes().subscribe({
      next: (r)=>{
        this.ProfileActionTypes = r;
      },
      error: (e) => {
        this.ProfileActionTypes = null;
      }
    });
  }

  public ParentHandleProfileInfoClickEvent = (param: any) => {
    //console.log(`Call Back Test - Message From Child - ${param}`)
    this.showProfileInfo = param && (<Boolean>param.showProfileInfo);
    if(!this.showProfileInfo){
      this.profile = null;
      sessionStorage.clear();
      this.apiCallError = null;
    }
  }



  public ProfileLoginEventCallBack = (param: any): void => {
    if (param && param.obj && param.type)
      switch (param.type) {
        case ProfileActionTypeEnum.Login:
          this._profileApiService.GetProfiles(0, 10,param.obj.Email, param.obj.Password, true).subscribe(
            {
              next: (r) => {
                //console.log(r);
                //debugger;
                if(r 
                  && r.isValidUser 
                  && r.data 
                  && Array.isArray(r.data) 
                  && r.data.length > 0
                  && (r.data[0] != null && r.data[0].email != '')
                )
                {
                  this.profile = r.data[0];
                  this.apiCallError = null;
                  sessionStorage.setItem(this.SessionName_Profile,JSON.stringify(this.profile));
                  this._idle.watch();
                }
                else{
                  this.apiCallError = "Profile Not Found!"
                }
              },
              error: (e) => {
                console.log(e);
                this.apiCallError = "Profile Not Found!";

              }
      
            });
          break;
        case ProfileActionTypeEnum.Register:
        case ProfileActionTypeEnum.ResetPassword:
          let profileActionType = (<ProfileActionTypeEnum>param.type);
          this._profileApiService.SaveProfile(profileActionType, param.obj).subscribe(
            {
              next: (r) => {
                
                //console.log(r);
                this.profile = r;
                this.apiCallError =  null;
                sessionStorage.setItem(this.SessionName_Profile,JSON.stringify(this.profile));
                this._idle.watch();

              },
              error: (e) => {
                console.log(e);
                this.apiCallError = e && e.error;
              }

            });
          break;
        default:
          break;


      }






  
  }

  public ProfileInfoHandleCallBack =(param: any)=>{
    // debugger;
    if(param && param.type){
      switch(param.type){
        case ProfileActionTypeEnum.UpdateProfile:
        case ProfileActionTypeEnum.ChangeEmail:
        case ProfileActionTypeEnum.ResetPassword:
          let profileActionType = (<ProfileActionTypeEnum>param.type);
          this._profileApiService.SaveProfile(profileActionType, param.obj).subscribe(
            {
              next: (r) => {
                
                //console.log(r);
                this.profile = r;
                this.apiCallError =  null;
                sessionStorage.setItem(this.SessionName_Profile,JSON.stringify(this.profile));
                this._idle.watch();

              },
              error: (e) => {
                //console.log(e);
                this.apiCallError = e && e.error;
              }

            });

        break;
        default:
          this.showProfileInfo = false;
          break;
      }
    }
    else{
      this.showProfileInfo = false;
    }
    
  }

  SubscribeIdle(_idle: Idle, timeinSeconds: number) {
    _idle.setIdle(timeinSeconds);
    _idle.setTimeout(timeinSeconds);
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
      sessionStorage.clear();
    });
  }
}
