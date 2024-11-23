import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import { frontZapFarmaHeaderComponent } from 'src/app/shared/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'front-zapfarma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent{

  constructor(
    private router: Router,
  ) { }


  esqueceuSenha() {
    this.router.navigate(['/esqueceu-senha'])
  }

  login() {
    this.router.navigate(['/dashboard'])
  }

}
