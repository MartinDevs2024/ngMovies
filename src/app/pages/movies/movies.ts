import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../_models/movie';
import { MovieService } from '../../_services/movie.service';
import { debounceTime, distinct, distinctUntilChanged, filter, fromEvent, map, Subscription, switchMap } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { CardMovie } from '../card-movie/card-movie';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, CardMovie],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit{
  @ViewChild('movieSearchInput', {static: true }) movieSearchInput!: ElementRef
  movies: Movie[] = [];
  private movieService = inject(MovieService)
  private movieSubscription?: Subscription



 ngOnInit(): void {
    this.movieSubscription = fromEvent<InputEvent>(this.movieSearchInput.nativeElement, 'input').pipe(
      map(() => this.movieSearchInput.nativeElement.value.trim()),
      filter(term => term.length > 3),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.movieService.getMovies(term))
    ).subscribe({
      next: (movies) => {
        this.movies = movies ?? [];
      },
      error: (err) => {
        console.error('Movie fetch failed:', err);
        this.movies = [];
      }
    });
  }

}
