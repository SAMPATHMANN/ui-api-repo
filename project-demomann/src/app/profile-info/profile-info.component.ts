import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileServiceService} from '../profile-service.service';
import { response } from 'express';
import { error } from 'console';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})

export class ProfileInfoComponent {
  
  isDisabled: boolean = true;

  

  

  handleEnable(){
    this.isDisabled = false;
  }

  handleReset(){
    this.isDisabled = true;
  }

  handleSave(){

  }


  
}