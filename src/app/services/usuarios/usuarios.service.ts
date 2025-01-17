// import { Usuarios } from './../../interfaces/usuarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Requested-With',
  }),
};

@Injectable()
export class UsuariosService {
  constructor(private _httpClient: HttpClient, private router: Router) {}

  /**
   * Consultando Servicos na Servidor, retornando JSON Ge
   * @author Paulo Eduardo
   */
  consultaUsuarios() {
    return this._httpClient.get(
      `${environment.apiProd}/hotmart_afiliados`,
      httpOptions
    );
  }

  /**
   * Consultando Servicos na Servidor, retornando JSON Ge
   * @author Paulo Eduardo
   */
  consultaCpfUsuario(cpf: string) {
    return this._httpClient.get(
      `${environment.apiProd}/hotmart_afiliados/cpfCnpj/${cpf}`,
      httpOptions
    );
  }

  consultarCep(cep: string) {
    return this._httpClient.get(
      `https://viacep.com.br/ws/${cep}/json/`,
      httpOptions
    );
  }

  /**
   * Consultando Servicos na Servidor, retornando JSON Ge
   * @author Paulo Eduardo
   */
  RecuperaSenhaUsuarios(email: any) {
    const data = {
      email: email
    }
    return this._httpClient.post(
      `${environment.apiProd}/hotmart_afiliados/recuperar-senha`,
      data,
      httpOptions
    );
  }


  AlterarSenhaUsuarios(id:any, senha: any) {
    const data = {
      id: id,
      senha: btoa(senha)
    }
    return this._httpClient.put(
      `${environment.apiProd}/hotmart_afiliados/alterar-senha/${id}`,
      data,
      httpOptions
    );
  }

  

  /**
   * Consultando Servicos na Servidor, retornando JSON Ge
   * @author Paulo Eduardo
   */
  AdicionarUsuarios(body: any) {
    body.senha = btoa(body.senha);
    return this._httpClient.post(
      `${environment.apiProd}/hotmart_afiliados`,
      body,
      httpOptions
    );
  }


  logar(usuario: any): Observable<any> {
    usuario.senha = btoa(usuario.senha);
    return (
      this._httpClient
        .post(`${environment.apiProd}/hotmart_afiliados/login`,
        usuario, 
        httpOptions)
        .pipe(
          tap((resposta: any) => {
            if (Object.keys(resposta).length === 0) return;
            sessionStorage.setItem('token', btoa(JSON.stringify(resposta._id)));
            sessionStorage.setItem('usuario', btoa(JSON.stringify(resposta)));
            // this.router.navigate(['home']);
          }),
          catchError(error => {
            // Here you can handle the error and retrieve the HTTP status code
            const statusCode = error.status;
            // Do something with the status code
            return throwError(error);
          })
        )
    );
  }

  alterarSenhaFormulario(usuario: any): Observable<any> {
    usuario.senha = btoa(usuario.senha);
    return this._httpClient
      .post(
        `${environment.apiProd}/usuarios/alterar-senha/${usuario.email}`,
        usuario,
        httpOptions
      )
      .pipe(
        // .post(`http://52.67.156.34:5050/usuarios/alterar-senha${usuario.email}`,usuario, httpOptions).pipe(
        tap()
      );
  }

  alterarCadastro(usuario: any): Observable<any> {
    const cpf: string = usuario.cpf;
    return this._httpClient
      .post(
        // `http://52.67.156.34:5050/usuarios/alterar-cadastro/${cpf}`,
        `${environment.apiProd}/usuarios/alterar-cadastro/${cpf}`,
        usuario,
        httpOptions
      )
      .pipe(
        tap()
      );
  }

  alterarSenha(usuario: any): Observable<any> {
    usuario.senha = btoa(usuario.senha);
    return this._httpClient
      .post(
        `${environment.apiProd}/sys-eventos-usuarios/alterar-senha/${usuario._id}`,
        usuario,
        httpOptions
      )
      .pipe(
        // .post(`http://52.67.156.34:5050/usuarios/alterar-senha${usuario.email}`,usuario, httpOptions).pipe(
        tap()
      );
  }

  recuperarSenha(usuario: any): Observable<any> {
    return this._httpClient
      .post(
        `${environment.apiProd}/sys-eventos-usuarios/recuperar-senha/${usuario.email}`,
        usuario,
        httpOptions
      )
      .pipe(
        // .post(`http://52.67.156.34:5050/usuarios/recuperar-senha/${usuario.email}`,usuario, httpOptions).pipe(
        tap()
      );
  }

  deslogar() {
    sessionStorage.clear();
    setTimeout(this.reload, 10);
  }

  reload() {
    window.location.reload();
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


