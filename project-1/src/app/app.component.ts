import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NgComponentOutlet, AsyncPipe,CommonModule,
    AppHeaderComponent,
    ProfileInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular project-1';

  showProfileInfo: boolean= false;

  public ParentHandleProfileInfoClickEvent = (param: any) => {

    console.log(`Call Back Test - Message From Child - ${param}`)
    this.showProfileInfo = param && (<Boolean>param.showProfileInfo);
    
  }
}
