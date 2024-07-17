import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {


  constructor(private http: HttpClient) { }

  GetProfiles(skip: number = 0, take: number = 10, email: string = '', password: string = '', authenticate: boolean = false, orderBy: number = 1) {
    let apiResp = this.http.get<any>(`http://localhost:5257/profile/get?Skip=${skip}&Take=${take}&Email=${email}&Password=${password}&authenticate=${authenticate}&OrderBy=${orderBy}`);
    return apiResp;
  }

  SaveProfile(profilePostObj: any){
    let apiResp = this.http.post<any>(`http://localhost:5257/profile/save`,profilePostObj );
    return apiResp;
  }
}
