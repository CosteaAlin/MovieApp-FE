import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from './ratings';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getRatingByMovieId(movieId: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiServerUrl}/rating?movieId=${movieId}`);
  }

  public addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${this.apiServerUrl}/rating`, rating);
  }

  public updateRating(rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(`${this.apiServerUrl}/rating`, rating);
  }

  public deleteRating(ratingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/rating?ratingId=${ratingId}`);
  }
}
