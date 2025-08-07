import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profiles/profile.service';
import { WatchlistService } from '../../core/services/experience/watchlist.service';
import { ReviewService } from '../../core/services/experience/review.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  activeProfile: any = null;
  userEmail: string = '';
  userRole: string = '';
  activeTab: string = 'watchlists';
  watchlists: any[] = [];
  reviews: any[] = [];

  constructor(
    private profileService: ProfileService,
    private watchlistService: WatchlistService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProfileData();
    this.loadWatchlists();
    this.loadReviews();
  }

  loadProfileData() {
    this.activeProfile = this.profileService.getActiveProfileData();
    this.userEmail = sessionStorage.getItem('userEmail') || '';
    this.userRole = sessionStorage.getItem('userRole') || '';
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
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

  loadReviews() {
    this.reviewService.getMyReviews().subscribe({
      next: (response) => {
        this.reviews = response.content || [];
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.reviews = [];
      }
    });
  }

  goToMovie(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
