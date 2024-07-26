import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileActionTypeEnum } from '../Models/Enums';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe, CommonModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})

export class ProfileInfoComponent implements OnInit {

  formSeperator: string = "form-seperator";
  @Input() Profile: any;
  @Input() ProfileActionTypes: any;
  @Input() ApiCallError: any = null;
  @Output() HandleParentCallBack = new EventEmitter<any>();
  parentCallBackObjectType: any = null;
  parentCallBackObject = {
    obj: null,
    type: 0
  };

  title: string = "";
  currentEmail: string = "";


  profileForm: FormGroup;
  profileFormValidators: any;
  profileFormSubmit: boolean = false;
  profileActionTypeId: number = ProfileActionTypeEnum.UpdateProfile;
  profileActionTypeDesc: string = "";


  constructor() {
    this.profileForm = new FormGroup({
      FirstName: new FormControl(this.Profile?.firstName),
      LastName: new FormControl(this.Profile?.lastName),
      Phone: new FormControl(this.Profile?.phone),
      Email: new FormControl(this.Profile?.email),
      EmailReenter: new FormControl(''),
      Password: new FormControl(''),
      PasswordReEnter: new FormControl(''),
    });
    this.profileFormValidators = {
      FirstName: this.profileForm.controls["FirstName"],
      LastName: this.profileForm.controls["LastName"],
      Phone: this.profileForm.controls["Phone"],
      Email: this.profileForm.controls["Email"],
      EmailReenter: this.profileForm.controls["EmailReenter"],
      Password: this.profileForm.controls["Password"],
      PasswordReEnter: this.profileForm.controls["PasswordReEnter"],
    };

  }
  ngOnInit(): void {
    // console.log(this.Profile);
    this.title = `${this.Profile?.firstName}'s Profile`
    this.currentEmail =  this.Profile?.email;
    //debugger;
    this.InitialFormSetting();
  }


  private InitialFormSetting() {
    this.profileForm = new FormGroup({
      FirstName: new FormControl(this.Profile?.firstName, [Validators.required]),
      LastName: new FormControl(this.Profile?.lastName, [Validators.required]),
      Phone: new FormControl(this.Profile?.phone, [Validators.required]),
      Email: new FormControl(this.Profile?.email, [Validators.required]),
      EmailReenter: new FormControl(''),
      Password: new FormControl(this.Profile?.password),
      PasswordReEnter: new FormControl(this.Profile?.passwordReEnter),
    });
    this.profileFormValidators = {
      FirstName: this.profileForm.controls["FirstName"],
      LastName: this.profileForm.controls["LastName"],
      Email: this.profileForm.controls["Email"],
      EmailReenter: this.profileForm.controls["EmailReenter"],
      Phone: this.profileForm.controls["Phone"],
      Password: this.profileForm.controls["Password"],
      PasswordReEnter: this.profileForm.controls["PasswordReEnter"],
    };
  }

  handleSaveDemogrph() {

    this.profileFormSubmit = true;
    var isFormValid = this.profileForm.valid;
    if (isFormValid) {
      this.parentCallBackObject.obj = this.profileForm.value;
      this.parentCallBackObject.type = ProfileActionTypeEnum.UpdateProfile;
      this.HandleParentCallBack.emit(this.parentCallBackObject);
    }

  }

  handleChangeEmail(){
    this.profileFormSubmit = true;
    var isFormValid = this.profileForm.valid;
    if (isFormValid) {
      this.parentCallBackObject.obj = this.profileForm.value;
      this.parentCallBackObject.type = ProfileActionTypeEnum.ChangeEmail;
      this.HandleParentCallBack.emit(this.parentCallBackObject);
    }
  }

  handleResetPassword(){
    this.profileFormSubmit = true;
    var isFormValid = this.profileForm.valid;
    if (isFormValid) {
      this.parentCallBackObject.obj = this.profileForm.value;
      this.parentCallBackObject.type = ProfileActionTypeEnum.ResetPassword;
      this.HandleParentCallBack.emit(this.parentCallBackObject);
    }
  }

  handleResetPasswordView() {
    // debugger;
    this.profileActionTypeId = this.ProfileActionTypes && this.ProfileActionTypes[ProfileActionTypeEnum.ResetPassword - 1]?.actionId;
    this.profileActionTypeDesc = this.ProfileActionTypes && this.ProfileActionTypes[ProfileActionTypeEnum.ResetPassword - 1]?.actionDescription;
    this.title = `${`${this.Profile?.firstName}'s Profile`} ${this.profileActionTypeDesc}`;
    (<FormControl>this.profileFormValidators?.EmailReenter)?.removeValidators(x=>x);
    (<FormControl>this.profileFormValidators?.Password)?.addValidators([Validators.required]);
    (<FormControl>this.profileFormValidators?.PasswordReEnter)?.addValidators([Validators.required]);
  }

  handleResetEmailAccountView() {
    this.profileActionTypeId = this.ProfileActionTypes && this.ProfileActionTypes[ProfileActionTypeEnum.ChangeEmail - 1]?.actionId;
    this.profileActionTypeDesc = this.ProfileActionTypes && this.ProfileActionTypes[ProfileActionTypeEnum.ChangeEmail - 1]?.actionDescription;
    this.title = `${`${this.Profile?.firstName}'s Profile`} ${this.profileActionTypeDesc}`;
    (<FormControl>this.profileFormValidators?.EmailReenter)?.addValidators([Validators.required, Validators.email]);
    (<FormControl>this.profileFormValidators?.Password)?.removeValidators(x => x);
    (<FormControl>this.profileFormValidators?.PasswordReEnter)?.removeValidators(x => x);
  }

  handleBack() {
    this.ApiCallError = null;
    if (this.profileActionTypeId > 0) {
      switch (this.profileActionTypeId) {
        case ProfileActionTypeEnum.UpdateProfile:
          this.parentCallBackObject.obj = null;
          this.parentCallBackObject.type = 0;
          this.HandleParentCallBack.emit(this.parentCallBackObject);
          break;
        case ProfileActionTypeEnum.ResetPassword:
        case ProfileActionTypeEnum.ChangeEmail:
          this.profileActionTypeId = this.ProfileActionTypes && this.ProfileActionTypes[ProfileActionTypeEnum.UpdateProfile - 1]?.actionId;
          this.profileActionTypeDesc = this.ProfileActionTypes && this.ProfileActionTypes[ProfileActionTypeEnum.UpdateProfile - 1]?.actionDescription;
          this.title = `${`${this.Profile?.firstName}'s Profile`}`;
          (<FormControl>this.profileFormValidators?.Password)?.removeValidators(x => x);
          (<FormControl>this.profileFormValidators?.PasswordReEnter)?.removeValidators(x => x);
          (<FormControl>this.profileFormValidators?.EmailReenter)?.removeValidators(x=>x);
          this.InitialFormSetting()
          break;
      }
    }

  }

}
