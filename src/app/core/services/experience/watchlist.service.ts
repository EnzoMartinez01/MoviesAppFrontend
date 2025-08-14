import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../enviroments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private baseUrl = `${environment.apiUrl}/watchlist`;

  constructor(private http: HttpClient) { }

  getWatchlist(page: number = 0, size: number = 10): Observable<any> {
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
    };
    return this.http.get(`${this.baseUrl}/myWatchlist`, { headers, params });
  }

  addWatchlist(watchlist: string): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params: any = {
      listName: watchlist.toString()
    };
    return this.http.post<any>(`${this.baseUrl}/create`, null, { headers, params });
  }

  addMovieByWatchlist(idWatchlist: number, idMovie: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const params: any = {
      idMovie: idMovie.toString(),
      idWatchlist: idWatchlist.toString()
    };
    return this.http.put(`${this.baseUrl}/addMovie`, null, { headers, params });
  }

  deleteWatchlist(idWatchlist: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/deletewatchlist/${idWatchlist}`, { headers });
  }
}
