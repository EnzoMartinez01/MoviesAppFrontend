import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../core/services/movies/movies.service';
import { Movie } from '../../core/intefaces/movie.interface';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [CommonModule, MatProgressSpinner, MatIcon, RouterLink, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  movies: Movie[] = [];
  searchQuery = '';
  searchTerm = '';
  loading = false;
  noResults = false;
  private searchSubject = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(searchTerm => {
      if (searchTerm.trim()) {
        this.searchQuery = searchTerm;
        this.searchMovies();
      } else {
        this.movies = [];
        this.noResults = false;
      }
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.searchTerm = this.searchQuery;
      if (this.searchQuery) {
        this.searchMovies();
      }
    });
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  searchMovies() {
    this.loading = true;
    this.noResults = false;
    
    this.moviesService.searchMovies(this.searchQuery).subscribe({
      next: (response) => {
        this.movies = response.content || [];
        this.noResults = this.movies.length === 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error en la búsqueda:', error);
        this.movies = [];
        this.noResults = true;
        this.loading = false;
      }
    });
  }


}
