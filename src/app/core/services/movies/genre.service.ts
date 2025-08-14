import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../enviroments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private baseUrl = `${environment.apiUrl}/genre`;

  constructor(private http: HttpClient) { }

  getAllGenres(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`, {
      params: {
        page: page.toString(),
        size: size.toString(),
      }
    });
  }

  addGenre(genre: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post<any>(`${this.baseUrl}/addGenre`, genre, { headers });
  }

  updateGenre(idGenre: number, updatedGenre: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.baseUrl}/updateGenre/${idGenre}`, updatedGenre, { headers });
  }
}
