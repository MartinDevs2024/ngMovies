import { Component, Input } from '@angular/core';
import { Movie } from '../../_models/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-movie',
  imports: [RouterLink],
  templateUrl: './card-movie.html',
  styleUrl: './card-movie.css'
})
export class CardMovie {
  @Input() movie!: Movie;

  getImage(): string {
    return this.movie?.Poster && this.movie.Poster !== 'N/A'
      ? this.movie.Poster
      : 'https://placehold.co/400';
  }
}
