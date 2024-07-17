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
// import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
// import { Keepalive } from '@ng-idle/keepalive';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgComponentOutlet, CommonModule, ReactiveFormsModule, FormsModule, 
    // NgIdleKeepaliveModule,
    ChildTestComponent,
    AppHeaderComponent,
    LoginPageComponent,
    ProfileInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'Demomann';
  isValidUser: boolean = false;
  profile: any;
  showProfileInfo: boolean = false;

  //session TimeOut Code


  constructor(
    private appService: AppService, 
    private profileApiService: ProfileServiceService) {

    // sets an idle timeout of 5 seconds, for testing purposes.
    //this.SessionsTimeOutIdle(idle, keepalive);

    

  }



  ngOnInit(): void {
    
  }

  public ParentHandleProfileInfoClickEvent = (param: any) => {
    console.log(`Call Back Test - Message From Child - ${param}`)
    this.showProfileInfo = param && (<Boolean>param.showProfileInfo);
  }

  public ProfileAuthenticationEventCallBack = (param: any): void => {
    if (param && param.obj && param.type)
      switch (param.type) {
        case SystemEntryTypeEnum.Login:
          this.profileApiService.GetProfiles(0, 10,param.obj.Email, param.obj.Password, true).subscribe(
            {
              next: (r) => {
                console.log(r);
                // debugger;
                this.title = "Demomann"
                this.isValidUser = r && r.isValidUser;
                this.profile = r;
                this.appService.setUserLoggedIn(true);
              },
              error: (e) => {
                console.log(e);
              }
      
            });
          break;
        case SystemEntryTypeEnum.Register:
        case SystemEntryTypeEnum.ForgotPassword:
          this.profileApiService.SaveProfile(param).subscribe(
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

  // //Session Code
  // idleState = 'Not started.';
  // timedOut = false;
  // lastPing?: any = null;
  // reset() {
  //   this.idle.watch();
  //   //xthis.idleState = 'Started.';
  //   this.timedOut = false;
  // }

  // hideChildModal(): void {
  //   // this.childModal.hide();
  // }

  // stay() {
  //   // this.childModal.hide();
  //   this.reset();
  // }

  // logout() {
  //   // this.childModal.hide();
  //   this.appService.setUserLoggedIn(false);
  //   // this.router.navigate(['/']);
  // }

  // private SessionsTimeOutIdle(idle: Idle, keepalive: Keepalive) {
  //   idle.setIdle(5);
  //   // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
  //   idle.setTimeout(5);
  //   // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
  //   idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

  //   idle.onIdleEnd.subscribe(() => {
  //     this.idleState = 'No longer idle.';
  //     console.log(this.idleState);
  //     this.reset();
  //   });

  //   idle.onTimeout.subscribe(() => {
  //     // this.childModal.hide();
  //     this.idleState = 'Timed out!';
  //     this.timedOut = true;
  //     console.log(this.idleState);
  //     // this.router.navigate(['/']);
  //   });

  //   idle.onIdleStart.subscribe(() => {
  //     this.idleState = 'You\'ve gone idle!';
  //     console.log(this.idleState);
  //     // this.childModal.show();
  //   });

  //   idle.onTimeoutWarning.subscribe((countdown) => {
  //     this.idleState = 'You will time out in ' + countdown + ' seconds!';
  //     console.log(this.idleState);
  //   });

  //   // sets the ping interval to 15 seconds
  //   keepalive.interval(15);

  //   keepalive.onPing.subscribe(() => this.lastPing = new Date());

  //   this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
  //     if (userLoggedIn) {
  //       idle.watch();
  //       this.timedOut = false;
  //     } else {
  //       idle.stop();
  //     }
  //   });
  //   // this.reset();
  // }

}
