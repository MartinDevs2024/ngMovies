import { Component, inject, OnInit } from '@angular/core';
import { Movie } from '../../_models/movie';
import { MovieService } from '../../_services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails implements OnInit{
  movie!: Movie;
  private movieService = inject(MovieService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
     this.loadMovie();
  }

   loadMovie() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.movieService.getMovie(id).subscribe(movie => {
      this.movie = movie;
      console.log(movie);
    })
  }

}
