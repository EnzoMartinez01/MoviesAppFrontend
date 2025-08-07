import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ReviewService } from '../../../core/services/experience/review.service';

@Component({
  selector: 'app-reviews-adm',
  imports: [
    CommonModule,
    FormsModule,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './reviews-adm.component.html',
  styleUrl: './reviews-adm.component.css'
})
export class ReviewsAdmComponent implements OnInit {
  reviews: any[] = [];
  filteredReviews: any[] = [];
  searchTerm = '';

  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;
  Math = Math;

  showDetailModal = false;
  selectedReview: any = null;

  constructor(
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.reviewService.getAllReviews(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.reviews = response.content || [];
        this.filteredReviews = this.reviews;
        this.totalPages = response.totalPages || 0;
        this.totalElements = response.totalElements || 0;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.reviews = [];
        this.filteredReviews = [];
      }
    });
  }

  filterReviews() {
    if (this.searchTerm.trim()) {
      this.filteredReviews = this.reviews.filter(review =>
        review.titleName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        review.fullname.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredReviews = this.reviews;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadReviews();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadReviews();
    }
  }

  viewReviewDetail(review: any) {
    this.selectedReview = review;
    this.showDetailModal = true;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedReview = null;
  }



  deleteReview(review: any) {
    if (confirm(`¿Estás seguro de eliminar la reseña de "${review.titleName}"?`)) {
      this.reviewService.deleteReview(review.idReview).subscribe({
        next: (response) => {
          console.log('Review deleted successfully:', response);
          this.loadReviews();
        },
        error: (error) => {
          console.error('Error deleting review:', error);
        }
      });
    }
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
