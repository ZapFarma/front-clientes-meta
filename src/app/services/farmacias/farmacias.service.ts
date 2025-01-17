// import { Usuarios } from './../../interfaces/usuarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { UsuariosService } from '../usuarios/usuarios.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
  }),
};

@Injectable()
export class FarmaciasService {
  usuario: any
  constructor(
    private _httpClient: HttpClient, 
    private router: Router,
    private _usuariosService: UsuariosService,
    
  ) {
      this.usuario = this._usuariosService.obterUsuarioLogado;
    }

  /**
   * Consultando Servicos na Servidor, retornando JSON Ge
   * @author Paulo Eduardo
   */
  consultarFarmacias() {
    return this._httpClient.get(
      `${environment.apiProd}/hotmart_farmacias`,
      httpOptions
    );
  }

   /**
   * Consultando Servicos na Servidor, retornando JSON Ge
   * @author Paulo Eduardo
   */
   consultarFarmaciasAfiliados() {
    return this._httpClient.get(
      `${environment.apiProd}/hotmart_farmacias/afiliados/${this.usuario.id}`,
      httpOptions
    );
  }


    /**
   * Consultando Servicos na Servidor, retornando JSON Ge
   * @author Paulo Eduardo
   */
    consultarFarmaciasId(id:any) {
      return this._httpClient.get(
        `${environment.apiProd}/hotmart_farmacias/${id}`,
        httpOptions
      );
    }

  

    /**
     * Consultando Servicos na Servidor, retornando JSON Ge
     * @author Paulo Eduardo
     */
    AdicionarFarmacias(body: any) {
      body.senha = btoa(body.senha);
      body.idAfiliados = this.usuario.id
      return this._httpClient.post(
        `${environment.apiProd}/hotmart_farmacias`,
        body,
        httpOptions
      );
    }


       /**
     * Consultando Servicos na Servidor, retornando JSON Ge
     * @author Paulo Eduardo
     */
       AtualizarFarmacias(body: any) {
        body.senha = btoa(body.senha);
        body.idAfiliados = this.usuario.id
        return this._httpClient.put(
          `${environment.apiProd}/hotmart_farmacias/${body.id}`,
          body,
          httpOptions
        );
      }
  
  get obterUsuarioLogado(): any {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const usuario: string = sessionStorage.getItem('usuario')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? sessionStorage.getItem('usuario')!
      : '';
    return Object.keys(usuario).length > 0 ? JSON.parse(atob(usuario)) : null;
  }
  get obterIdUsuarioLogado(): any {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const usuario: string = sessionStorage.getItem('usuario')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? sessionStorage.getItem('usuario')!
      : '';
    return Object.keys(usuario).length > 0
      ? JSON.parse(atob(usuario)).id
      : null;
  }

  get obterPerfilUsuarioLogado(): any {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const usuario: any = sessionStorage.getItem('usuario')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? sessionStorage.getItem('usuario')!
      : {};
    return Object.keys(usuario).length > 0
      ? JSON.parse(atob(usuario)).funcao_departamento
      : null;
  }

  get obterUsuarioAdminLogado(): any {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const usuario: any = sessionStorage.getItem('usuario')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? sessionStorage.getItem('usuario')!
      : {};
    return Object.keys(usuario).length > 0
      ? JSON.parse(atob(usuario)).admin
      : null;
  }

  get obterUsuarioAdminSysLogado(): any {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const usuario: any = sessionStorage.getItem('usuario')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? sessionStorage.getItem('usuario')!
      : {};
    return Object.keys(usuario).length > 0
      ? JSON.parse(atob(usuario)).admin_sys
      : null;
  }

  get logado(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }

  
}


