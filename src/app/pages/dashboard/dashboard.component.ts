import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { frontZapFarmaHeaderComponent } from 'src/app/shared/header/header.component';
import { frontZapFarmaMenuComponent } from 'src/app/shared/menu/menu.component';

@Component({
  selector: 'front-zapfarma-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, 
    frontZapFarmaMenuComponent, 
    frontZapFarmaHeaderComponent, 
    ReactiveFormsModule, 
    NgxMaskDirective, 
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class DashboardComponent implements OnInit {
  usuario:any;
  constructor(
    private _usuariosService: UsuariosService,
  ) {
    this.usuario = this._usuariosService.obterUsuarioLogado;
   }

  ngOnInit() {
  }


}
