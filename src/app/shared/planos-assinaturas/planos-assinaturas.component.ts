import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'front-zapfarma-planos-assinaturas',
  templateUrl: './planos-assinaturas.component.html',
  styleUrls: ['./planos-assinaturas.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MatIconModule, MatButtonModule]
})
export class PlanosAssinaturasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
