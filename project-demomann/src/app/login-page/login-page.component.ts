import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SystemEntryTypeEnum } from '../Models/SystemEntryTypeEnum';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe,CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent implements OnInit {


  entryStateId : number = 0;
  entryStateValue: string = '';
  
  formSeperator: string = "form-seperator";
  // emailAddressEntered= new FormControl('', [Validators.required]);
  // passwordEntered= new FormControl('', [Validators.required]);

  loginCreds = new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required]),
    PasswordReEnter:  new FormControl('', [Validators.required]),
    NewPassword: new FormControl('', [Validators.required]),
  });


  @Output() public ProfileAuthenticationEventCallBack = new EventEmitter<any>();

  ngOnInit(): void {
      this.SetEntryState(SystemEntryTypeEnum.Login);
  }
  handleLogin(){
    this.ProfileAuthenticationEventCallBack.emit({obj: this.loginCreds.value, type: SystemEntryTypeEnum.Login});
  }

  handleRegisterView(){
    this.SetEntryState(SystemEntryTypeEnum.Register);
    this.formSeperator ="";
  }

  handleRegister(){
    this.ProfileAuthenticationEventCallBack.emit({obj: this.loginCreds.value, type: SystemEntryTypeEnum.Register});
  }

  handleResetPasswordView(){
    this.SetEntryState(SystemEntryTypeEnum.ForgotPassword);
    this.formSeperator ="";
  }

  handleBack(){
    this.formSeperator= "form-seperator";
    this.SetEntryState(SystemEntryTypeEnum.Login);
  }

  handleResetPassword(){
    this.ProfileAuthenticationEventCallBack.emit({obj: this.loginCreds.value, type: SystemEntryTypeEnum.ForgotPassword});
  }

  SetEntryState(stateEnum: SystemEntryTypeEnum){
    switch(stateEnum){
      case SystemEntryTypeEnum.Login:
        this.entryStateId = 1;
        this.entryStateValue = "Login";
        break;
      case SystemEntryTypeEnum.Register:
        this.entryStateId = 2;
        this.entryStateValue = "Register";
        break;
      case SystemEntryTypeEnum.ForgotPassword:
        this.entryStateId = 3;
        this.entryStateValue = "Change Password"
        break;
        default:
          this.entryStateId = 1;
        this.entryStateValue = "Login";
          break;
    }
  }
}
