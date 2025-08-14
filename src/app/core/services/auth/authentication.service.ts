import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false;
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  registerUser(user: any, idRole: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/user/${idRole}`, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("Error en la petición:", error);
    return throwError(() => new Error('Error creating user.'));
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {username, password}).pipe(
      map((response: any) => {
        this.isAuthenticated = true;

        const token = response.token;
        const idUser = response.user;
        const role = response.role;

        if (token && idUser !== undefined) {
          this.saveToken(token, idUser, role);
        } else {
          console.log("Token o ID User not present in the response:", response)
        }
        return response;
      }),
      catchError((error) => {
        this.isAuthenticated = false;
        return throwError(() => error);
      })
    )
  }

  logout(): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers });
  }

  saveToken(token: string, idUser: number, role?: string): void {
    if (token && idUser !== undefined) {
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('idUser', idUser.toString());
      if (role) {
        sessionStorage.setItem('userRole', role);
      }
    } else {
      console.error("Token o ID de usuario inválido al guardar.");
    }
  }

  isAdmin(): boolean {
    const role = sessionStorage.getItem('userRole');
    return role === 'ADMIN';
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('authToken');
  }
}
