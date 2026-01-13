import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';
import { RodapeComponent } from '../rodape/rodape.component';

type Store = {
  name: string;
  address: string;
  complement?: string;
  phones?: string[];
  mapsUrl: string;
  photo: string;
};

@Component({
  selector: 'front-zapfarma-lojas',
  standalone: true,
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.scss'],
  imports: [CommonModule, RouterModule, ToolbarComponent, RodapeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LojasComponent {
  readonly stores: Store[] = [
    {
      name: 'Drogaria Anna Cintra - Amparo',
      address: 'R. Ana Cintra, 136 - Centro, Amparo - SP, 13901-310',
      phones: ['(19) 99644-8523'],
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Ana+Cintra,+136+-+Centro,+Amparo+-+SP,+13901-310',
      photo: 'assets/imgs/logo-anna cintra2.png',
    },
  ];
}
