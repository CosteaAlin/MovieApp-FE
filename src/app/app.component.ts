import { Component, OnInit } from '@angular/core';
import { Movie } from './movies';
import { Rating } from './ratings';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieService } from './movie.service';
import { RatingService } from './rating.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public movieId: number = NaN;
  public movies: Movie[] = [];
  public title: string = '';
  public overview: string = '';
  public image: string = '';
  public ratingId: number = NaN;
  public rating: number = NaN;
  public ratingInterface: Rating = { 'id': NaN, 'movieId': NaN, 'movieRating': NaN };
  public releaseDate: Date = new Date();
  public inputRating: number = NaN;
  public response: string = ''

  constructor(private movieService: MovieService,
    private ratingService: RatingService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(): void {
    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onOpenModal(movie: Movie): void {
    this.ratingService.getRatingByMovieId(movie.movieId).subscribe(
      (response: Rating) => {
        this.ratingInterface = response
        this.rating = this.ratingInterface.movieRating;
        this.ratingId = this.ratingInterface.id;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
    this.movieId = movie.movieId;
    this.title = movie.title;
    this.overview = movie.overview;
    this.image = movie.image;
    this.releaseDate = movie.releaseDate
    this.response = ''
  }

  public addRating(movieId: number): void {
    this.response = '';
    if (this.inputRating < 0 || this.inputRating > 10) {
      this.response = 'Rating must be between 1 and 10';
      return;
    }
    this.ratingInterface = { 'id': NaN, 'movieId': movieId, 'movieRating': this.inputRating };
    this.ratingService.addRating(this.ratingInterface).subscribe(
      (response: Rating) => {
        console.log(response);
        this.response = 'Your rating has been added'
        this.rating = this.ratingInterface.movieRating;
      },
      (error: HttpErrorResponse) => {
        this.response = "You have already rated this movie";
      }
    );
    this.inputRating = NaN;
  }

  public updateRating(movieId: number): void {
    this.response = '';
    if (this.inputRating < 0 || this.inputRating > 10) {
      this.response = 'Rating must be between 1 and 10';
      return;
    }
    this.ratingInterface = { 'id': this.ratingId, 'movieId': movieId, 'movieRating': this.inputRating };
    this.ratingService.updateRating(this.ratingInterface).subscribe(
      (response: Rating) => {
        console.log(response);
        this.response = 'Your rating has been updated'
        this.rating = this.ratingInterface.movieRating;
      },
      (error: HttpErrorResponse) => {
        this.response = "You dont have a rating for this movie";
      }
    );
    this.inputRating = NaN;
  }

  public deleteRating(ratingId: number): void {
    this.response = '';
    this.inputRating = 0;
    this.ratingService.deleteRating(ratingId).subscribe(
      (response: void) => {
        console.log(response);
        this.response = 'Your rating has been deleted';
        this.rating = 0;
      },
      (error: HttpErrorResponse) => {
        this.response = "You dont have a rating for this movie";
      }
    );
  }
}
