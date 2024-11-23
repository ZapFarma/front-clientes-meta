import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { frontZapFarmaHeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'front-zapfarma-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.scss'],
  standalone: true,
  imports: [CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    frontZapFarmaHeaderComponent
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EsqueceuSenhaComponent {

  constructor(
    private router: Router,
  ) { }

  voltarLogin() {
    this.router.navigate(['/login'])
  }

}
