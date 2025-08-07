import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../enviroments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}/review`;

  constructor(private http: HttpClient) { }

  getAllReviews(page: number = 0, size: number = 10): Observable<any> {
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
    return this.http.get(`${this.baseUrl}/getAll`, { headers, params });
  }

  getMyReviews(page: number = 0, size: number = 10): Observable<any> {
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
    return this.http.get(`${this.baseUrl}/myReviews`, { headers, params });
  }

  getReviewsByMovie(idMovie: number, page: number = 0, size: number = 10): Observable<any> {
    const params: any = {
      page: page.toString(),
      size: size.toString(),
      idMovie: idMovie.toString()
    }
    return this.http.get(`${this.baseUrl}/movie`, { params });
  }

  addReviewByMovie(review: any, idMovie: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/${idMovie}/addReview`, review, { headers });
  }

  deleteReview(idReview: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.baseUrl}/deleteReview/${idReview}`, { headers });
  }
}
