import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd,
  NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLoading = signal(false); // ✅ signal for reactivity
  private router = inject(Router);

  constructor() {
    effect(() => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.isLoading.set(true);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isLoading.set(false);
        }
      })
    })
  }
}
