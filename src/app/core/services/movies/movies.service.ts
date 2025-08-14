import { Injectable } from '@angular/core';
import {environment} from '../../../../enviroments/environment';
import {map, Observable} from 'rxjs';
import {Movie} from '../../intefaces/movie.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) { }

  getAllMovies(page: number = 0, size: number = 10, isActive: boolean = true): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`, {
      params: {
        page: page.toString(),
        size: size.toString(),
        isActive: isActive.toString()
      }
    });
  }

  getMoviesRanked(page: number = 0, size: number = 10, isActive: boolean = true): Observable<any> {
    return this.http.get(`${this.baseUrl}/top-rated`, {
      params: {
        page: page.toString(),
        size: size.toString(),
        isActive: isActive.toString()
      }
    });
  }

  getMovieById(idMovie: number): Observable<any> {
    return this.http.get<Movie>(`${this.baseUrl}/getMovie/${idMovie}`);
  }

  getMoviesByGenre(idGenre: number | null = null, page = 0, size = 10, isActive = true): Observable<any> {
    const params: any = {
      page: page.toString(),
      size: size.toString(),
      isActive: isActive.toString()
    };

    if (idGenre !== null) {
      params.idGenre = idGenre.toString();
    }

    return this.http.get<any>(`${this.baseUrl}/getMovies`, { params });
  }

  searchMovies(searchTerm: string, page = 0, size = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      params: {
        searchTerm: searchTerm,
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  addMovie(movie: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/addMovie`, movie, { headers });
  }

  updateMovie(idMovie: number, updatedMovie: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}/updateMovie/${idMovie}`, updatedMovie, { headers });
  }

  deactivateMovie(idMovie: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token no encontrado');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<any>(`${this.baseUrl}/deactivateMovie/${idMovie}`, null, { headers });
  }
}
