import { Component } from '@angular/core';
import {Movie} from '../../core/intefaces/movie.interface';
import {MoviesService} from '../../core/services/movies/movies.service';
import {GenreService} from '../../core/services/movies/genre.service';
import {MatCard, MatCardImage, MatCardTitle} from '@angular/material/card';
import {CommonModule, NgFor} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import { TranslationService } from '../../core/services/translation/translation.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NgFor,
    MatButton,
    RouterLink,
    MatIcon,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  movies: Movie[] = [];
  currentPage = 0;
  pageSize = 10;
  moviesByGenre: { [genreId: number]: Movie[] } = {};
  genres: any[] = [];

  constructor(
    private movieService: MoviesService, 
    private genreService: GenreService,
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getAllGenres().subscribe({
      next: (response) => {
        this.genres = response.content || [];
        this.genres.forEach(genre => {
          this.moviesByGenre[genre.idGenre] = [];
        });
        this.loadMoviesByGenre();
      },
      error: (err) => console.error('Error cargando géneros:', err)
    });
  }

  loadMovies(): void {
    this.movieService.getMoviesRanked(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.movies = data.content;
        console.log('Total pages:', data.totalPages);
      },
      error: (err) => console.error(err)
    });
  }

  loadMoviesByGenre(): void {
    this.genres.forEach((genre) => {
      this.movieService.getMoviesByGenre(genre.idGenre, this.currentPage, this.pageSize).subscribe({
          next: (response) => {
            this.moviesByGenre[genre.idGenre] = response.content || [];
          console.log(`Películas cargadas para género: ${genre.genreName}`);
        },
        error: (err) => console.error(`Error al cargar género ${genre.genreName}:`, err)
      });
    });
  }

  goToMoviesWithGenre(genreId: number) {
    this.router.navigate(['/movies'], { queryParams: { genre: genreId } });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
