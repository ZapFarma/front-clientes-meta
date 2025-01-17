import { UsuariosService } from './../usuarios/usuarios.service';
import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class UsuarioNaoAutenticadoGuard implements CanActivate{
    constructor(
      private usuarioService: UsuariosService,
      private router: Router) { }
    canActivate(){
      if (this.usuarioService.logado) {
        this.router.navigate(['dashboard']);
        return false;
      }
      return true;
    }
}