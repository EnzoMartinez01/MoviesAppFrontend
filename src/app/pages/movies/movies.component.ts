import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MoviesService } from '../../core/services/movies/movies.service';
import { GenreService } from '../../core/services/movies/genre.service';
import { Movie } from '../../core/intefaces/movie.interface';
import { TranslationService } from '../../core/services/translation/translation.service';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, RouterLink, MatIcon, MatProgressSpinner, MatPaginator],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genres: any[] = [];
  selectedGenre: number | null = null;
  loading = false;
  currentPage = 0;
  pageSize = 14;
  totalElements = 0;
  totalPages = 0;

  constructor(
    private moviesService: MoviesService,
    private genreService: GenreService,
    private route: ActivatedRoute,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.loadGenres();

    // Leer parámetro de género de la URL
    this.route.queryParams.subscribe(params => {
      if (params['genre']) {
        this.selectedGenre = parseInt(params['genre']);
      }
      this.loadMovies();
    });
  }

  loadGenres() {
    this.genreService.getAllGenres().subscribe({
      next: (response) => {
        this.genres = response.content || [];
      },
      error: (error) => {
        console.error('Error cargando géneros:', error);
      }
    });
  }

  loadMovies() {
    this.loading = true;
    this.moviesService.getMoviesByGenre(this.selectedGenre, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.movies = response.content || [];
        this.totalElements = response.totalElements || 0;
        this.totalPages = response.totalPages || 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando películas:', error);
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMovies();
  }

  onGenreSelect(genreId: number | null) {
    this.selectedGenre = genreId;
    this.currentPage = 0;
    this.loadMovies();
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
