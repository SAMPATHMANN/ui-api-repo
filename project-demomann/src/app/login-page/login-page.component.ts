import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileActionTypeEnum } from '../Models/Enums';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe,CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})

export class LoginPageComponent implements OnInit {


  @Input() ProfileActionTypes:any = null;
  entryStateId : number = 0;
  entryStateValue: string = '';
  
  formSeperator: string = "form-seperator";

  credentialForm: FormGroup;
  credentialFormValidators: any; 
  credentialFormSubmit:boolean = false;

  @Output() HandleParentCallBack = new EventEmitter<any>();
  @Input() ApiCallError: any = null;

  constructor(){
    this.credentialForm = new FormGroup({
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Phone: new FormControl(''),
      Password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      PasswordReEnter:  new FormControl(''),
    });
    this.credentialFormValidators = {
      FirstName: this.credentialForm.controls["FirstName"],
      LastName: this.credentialForm.controls["LastName"],
      Email: this.credentialForm.controls["Email"],
      Phone: this.credentialForm.controls["Phone"],
      Password: this.credentialForm.controls["Password"],
      PasswordReEnter:  this.credentialForm.controls["PasswordReEnter"],
    };
  }

  

  

  ngOnInit(): void {
    this.SetEntryState(ProfileActionTypeEnum.Login);
  }
  handleLogin(){
      this.CredentialFormSubmission(ProfileActionTypeEnum.Login);
  }

  handleRegisterView(){
    this.ApiCallError = null;
    (<FormControl>this.credentialFormValidators?.FirstName)?.addValidators([Validators.required]);
    (<FormControl>this.credentialFormValidators?.LastName)?.addValidators([Validators.required]);
    (<FormControl>this.credentialFormValidators?.PasswordReEnter)?.addValidators([Validators.required]);
    // (<FormControl>this.credentialFormValidators?.Phone)?.addValidators([Validators.required, Validators.pattern(/^\+?\d{1,4}?\(?\d{1,3}?\)?\d{1,4}\d{1,4}?[\-]\d{1,9}/g)]);
    this.SetEntryState(ProfileActionTypeEnum.Register);
    this.formSeperator ="";
  }

  handleRegister(){
    this.CredentialFormSubmission(ProfileActionTypeEnum.Register);
  }

  handleResetPasswordView(){
    this.ApiCallError = null;
    this.SetEntryState(ProfileActionTypeEnum.ResetPassword);
    this.formSeperator ="";
  }

  handleBack(){
    this.ApiCallError = null;
    this.formSeperator= "form-seperator";
    (<FormControl>this.credentialFormValidators?.FirstName)?.removeValidators(x=>x);
    (<FormControl>this.credentialFormValidators?.LastName)?.removeValidators(x=>x);
    (<FormControl>this.credentialFormValidators?.PasswordReEnter)?.removeValidators(x=>x);
    (<FormControl>this.credentialFormValidators?.Phone)?.removeValidators(x=>x);
    this.SetEntryState(ProfileActionTypeEnum.Login);
  }

  handleResetPassword(){
    this.CredentialFormSubmission(ProfileActionTypeEnum.ResetPassword);
  }

  CredentialFormSubmission(formSubmitType: ProfileActionTypeEnum) {
    //debugger;
    this.credentialFormSubmit = true;
    let isformValid = this.credentialForm.valid;
    if (isformValid)
      this.HandleParentCallBack
        .emit({ obj: this.credentialForm.value, type: formSubmitType });
  }

  SetEntryState(stateEnum: ProfileActionTypeEnum){
    // console.log(stateEnum);
    this.entryStateId = this.ProfileActionTypes? this.ProfileActionTypes[stateEnum-1]?.actionId : 1;
    // console.log(this.entryStateId);
    this.entryStateValue = this.ProfileActionTypes? this.ProfileActionTypes[stateEnum-1]?.actionDescription: "Login";
    // console.log(this.entryStateValue);
  }

}
