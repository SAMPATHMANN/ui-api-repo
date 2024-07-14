import { Component, Output, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-header',
  standalone: true,
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {

  Title_Name = 'demomann';

  showProfileInfo: boolean = false;

  @Output()  ProfileInfoClickEventCallBack = new EventEmitter<any>();

  profileInfoClickEventCallBack(){
    this.ProfileInfoClickEventCallBack.emit({showProfileInfo: this.showProfileInfo});
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
