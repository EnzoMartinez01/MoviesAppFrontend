import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = `${environment.apiUrl}/profiles`;

  constructor(private http: HttpClient) { }

  getProfilesByUser(): Observable<any> {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/getProfiles`, { headers });
  }

  getProfilesByIdUser(idUser: number): Observable<any>{
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/getProfile/${idUser}`, { headers });
  }

  createProfile(payload: { names: string; urlImage?: string }): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) throw new Error('Token not found');

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(`${this.baseUrl}/createProfile`, payload, { headers });
  }


  setActiveProfile(profileId: number): void {
    if (profileId !== undefined && profileId !== null) {
      sessionStorage.setItem('activeProfile', profileId.toString());
    }
  }

  getActiveProfile(): number | null {
    const profile = sessionStorage.getItem('activeProfile');
    return profile ? parseInt(profile) : null;
  }

  getActiveProfileData(): any {
    const profileData = sessionStorage.getItem('activeProfileData');
    return profileData ? JSON.parse(profileData) : null;
  }

  setActiveProfileData(profileData: any): void {
    sessionStorage.setItem('activeProfileData', JSON.stringify(profileData));
  }
}
