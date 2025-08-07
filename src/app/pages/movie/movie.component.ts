import { Component, OnInit } from '@angular/core';
import {Movie} from '../../core/intefaces/movie.interface';
import {MoviesService} from '../../core/services/movies/movies.service';
import {ActivatedRoute} from '@angular/router';
import {NgIf, NgFor, DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {WatchlistService} from '../../core/services/experience/watchlist.service';
import {ReviewService} from '../../core/services/experience/review.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-movie',
  imports: [
    NgIf,
    NgFor,
    MatButton,
    MatIcon,
    MatIconButton,
    MatChip,
    MatChipSet,
    FormsModule,
    DatePipe
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieId!: number;
  movie!: Movie;
  showTrailer = false;
  showMovie = false;
  safeTrailerUrl!: SafeResourceUrl;
  safeMovieUrl!: SafeResourceUrl;

  showWatchlistModal = false;
  watchlists: any[] = [];
  newWatchlistName = '';

  showReviewModal = false;
  movieReviews: any[] = [];
  newReview = {
    rating: 0,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private sanitizer: DomSanitizer,
    private watchlistService: WatchlistService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('idMovie'));
    this.movieService.getMovieById(this.movieId).subscribe({
      next: (data) => {
        this.movie = data;
        this.loadMovieReviews();
      },
      error: (err) => console.error(err),
    });
  }

  openTrailer() {
    if (this.movie?.urlTrailer) {
      const embedUrl = this.getEmbedUrl(this.movie.urlTrailer);
      this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      this.showTrailer = true;
    }
  }

  closeTrailer() {
    this.showTrailer = false;
  }

  openMovie() {
    if (this.movie?.movieUrl) {
      if (this.canEmbed(this.movie.movieUrl)) {
        const embedUrl = this.getEmbedUrl(this.movie.movieUrl);
        this.safeMovieUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        this.showMovie = true;
      } else {
        window.open(this.movie.movieUrl, '_blank');
      }
    }
  }

  closeMovie() {
    this.showMovie = false;
  }

  canEmbed(url: string): boolean {
    return !url.includes('tokyvideo.com');
  }

  getEmbedUrl(url: string): string {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    if (url.includes('drive.google.com')) {
      const fileId = this.extractGoogleDriveId(url);
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  }

  extractGoogleDriveId(url: string): string {
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : '';
  }

  openWatchlistModal() {
    this.loadWatchlists();
    this.showWatchlistModal = true;
  }

  closeWatchlistModal() {
    this.showWatchlistModal = false;
    this.newWatchlistName = '';
  }

  loadWatchlists() {
    this.watchlistService.getWatchlist().subscribe({
      next: (response) => {
        this.watchlists = response.content || [];
      },
      error: (err) => {
        console.error('Error loading watchlists:', err);
        this.watchlists = [];
      }
    });
  }

  addToWatchlist(watchlistId: number) {
    this.watchlistService.addMovieByWatchlist(watchlistId, this.movieId).subscribe({
      next: () => {
        console.log('Movie added to watchlist successfully');
        this.closeWatchlistModal();
      },
      error: (err) => {
        console.error('Error adding movie to watchlist:', err);
      }
    });
  }

  createAndAddToWatchlist() {
    if (this.newWatchlistName.trim()) {
      this.watchlistService.addWatchlist(this.newWatchlistName.trim()).subscribe({
        next: (watchlist) => {
          this.addToWatchlist(watchlist.idWatchlist);
        },
        error: (err) => {
          console.error('Error creating watchlist:', err);
        }
      });
    }
  }

  loadMovieReviews() {
    this.reviewService.getReviewsByMovie(this.movieId).subscribe({
      next: (response) => {
        this.movieReviews = response.content || [];
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.movieReviews = [];
      }
    });
  }

  openReviewModal() {
    this.showReviewModal = true;
  }

  closeReviewModal() {
    this.showReviewModal = false;
    this.newReview = { rating: 0, comment: '' };
  }

  setRating(rating: number) {
    this.newReview.rating = rating;
  }

  submitReview() {
    if (this.newReview.rating && this.newReview.comment.trim()) {
      const reviewData = {
        rating: this.newReview.rating,
        comment: this.newReview.comment
      };
      this.reviewService.addReviewByMovie(reviewData, this.movieId).subscribe({
        next: () => {
          console.log('Review added successfully');
          this.closeReviewModal();
          this.loadMovieReviews();
        },
        error: (err) => {
          console.error('Error adding review:', err);
        }
      });
    }
  }
}
