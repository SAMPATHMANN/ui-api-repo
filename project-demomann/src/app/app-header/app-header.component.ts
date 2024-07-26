import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-header',
  standalone: true,
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
  imports: [NgComponentOutlet, CommonModule, ReactiveFormsModule, FormsModule,]
})
export class AppHeaderComponent implements OnInit {

  constructor(){
    //console.log(this.data);
  }
  ngOnInit(): void {
    //console.log(this.data);
  }
  @Input() title = 'demomann';

  showProfileInfo: any = null;

  @Input() data:any = null;
  @Output()  ProfileInfoClickEventCallBack = new EventEmitter<any>();

  profileInfoClickEventCallBack(){
    this.ProfileInfoClickEventCallBack.emit({showProfileInfo: this.showProfileInfo});
  }
  profileLogoutClickEvent(){
    this.showProfileInfo = false;
    this.profileInfoClickEventCallBack();
  }
  profileLoginClickEvent(){
    this.showProfileInfo = null;
    this.profileInfoClickEventCallBack();
  }

  profileIconClickEvent() {
    this.showProfileInfo = true;
    this.profileInfoClickEventCallBack();
  }

  headerIconClickEvent(){
    this.showProfileInfo = false;
    this.profileInfoClickEventCallBack();
  }
}
