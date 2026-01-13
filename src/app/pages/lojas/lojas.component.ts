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
      name: 'Drogaria Mundial Rápida da Coronel',
      address: 'Rua Coronel Moreira Cesar, 001 lt2',
      phones: ['(21) 96667-0226', '(21) 97346-6002'],
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Moreira+Cesar,+001+lt2,+21655-180',
      photo: 'assets/imgs/logo-mundial.png',
    },
  ];
}
