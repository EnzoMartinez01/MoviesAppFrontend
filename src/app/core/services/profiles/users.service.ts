import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/me`, { headers })
  }

  addUser(user: any, idRole: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${environment.apiUrl}/auth/register/user/${idRole}`, user, { headers });
  }

  updateUser(idUser: number, updatedUser: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.baseUrl}/updateUser/${idUser}`, updatedUser, { headers })
  }

  deactivateUser(idUser: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.patch(`${this.baseUrl}/deactivateUser/${idUser}`, {}, { headers })
  }

  getAllUsers(searchTerm: string, isActive: boolean = true, page: number = 0, size: number = 10): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const params: any = {
      page: page.toString(),
      size: size.toString(),
      isActive: isActive.toString()
    };
    if (searchTerm.trim()) {
      params.searchTerm = searchTerm;
    }
    return this.http.get(`${this.baseUrl}/getAll`, { headers, params });
  }
}
