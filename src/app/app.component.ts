import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'front-zapfarma-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front-zapfarma';
}
