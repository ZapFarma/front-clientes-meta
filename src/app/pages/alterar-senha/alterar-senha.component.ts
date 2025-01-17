import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { catchError, of } from 'rxjs';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { frontZapFarmaHeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'front-zapfarma-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    frontZapFarmaHeaderComponent,
    ReactiveFormsModule,
    
  ],
  providers: [provideNgxMask(), UsuariosService],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AlterarSenhaComponent {
  formLogin: FormGroup;
  validCpf = true;
  onSubmitValidate = false;
  btnDisable = false;
  sucesso = false;
  error: any;
  _id: any;

  constructor(
    private router: Router,
    private _UsuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private routerActivate: ActivatedRoute, 

  ) {

    this.routerActivate.queryParamMap.subscribe((params: any) => {
      this._id = params.params.id;
    });
    this.criarForm();
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }

  alterarSenha() {
    const senha = this.formLogin.controls['senha'].value;
    this._UsuariosService
      .AlterarSenhaUsuarios(this._id, senha)
      .pipe(
        catchError((ret) => {
          this.sucesso = false;
          return of(false);
        })
      )
      .subscribe((ret) => {
        this.sucesso = true;
      });
  }

  openDialogCPF() {
    throw new Error('Method not implemented.');
  }

  criarForm() {
      this.formLogin = this.formBuilder.group({
        senha: new FormControl(null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ]),
      
    })
  }
}
