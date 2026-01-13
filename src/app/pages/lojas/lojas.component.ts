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
      name: 'Drogaria Mundial Rainha da Posse',
      address: 'Estr. João Venâncio Figueiredo, 01 Posse - Nova Iguaçu',
      phones: ['(21) 99366-9008'],
      mapsUrl: 'https://www.google.com/maps/place/Estr.+Jo%C3%A3o+Ven%C3%A2ncio+Figueiredo,+1+-+Posse,+Nova+Igua%C3%A7u+-+RJ',
      photo: 'assets/imgs/logo-mundial.png',
    },
  ];
}
