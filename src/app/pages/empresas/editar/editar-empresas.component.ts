import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { frontZapFarmaHeaderComponent } from 'src/app/shared/header/header.component';
import { frontZapFarmaMenuComponent } from 'src/app/shared/menu/menu.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FarmaciasService } from 'src/app/services/farmacias/farmacias.service';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { validate } from 'gerador-validador-cpf';
import { MatSelect } from '@angular/material/select';
import { catchError, of, retry } from 'rxjs';


export interface CEP {
  cidade: string;
  uf: string;
  logradouro?: string;
  bairro: string;
  estado?: string;
}


@Component({
  selector: 'front-zapfarma-editar-empresas',
  templateUrl: './editar-empresas.component.html',
  styleUrls: ['./editar-empresas.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    frontZapFarmaMenuComponent,
    frontZapFarmaHeaderComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatSelect,
    MatOptionModule

  ],
  providers: [FarmaciasService, provideNgxMask(),],
  
})
export class EditarEmpresasComponent {
    formLogin!: FormGroup;
    validCpf = true;
    onSubmitValidate = false;
    btnDisable = false;
    sucesso = false;
    error:any
    cep!: CEP;
    _id: any;
    farmacia!: any;
  
  
    constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private _farmaciasService: FarmaciasService,
      private _UsuariosService: UsuariosService,
      private routerActivate: ActivatedRoute,

  
    ) { 

      this.criarForm();
      this.cep = {
        cidade:'',
        bairro: '',
        uf: '',
        estado: '',
        logradouro: ''
      }

      this.routerActivate.queryParamMap.subscribe((params: any) => {
        this._id = params.params.id;
      });

      this.getFarmacias();

    }
  
  
    login() {
      this.router.navigate(['/login'])
    }
  
    voltar() {
      if(!this.error) {
        this.router.navigate(['/empresas'])
      }
      else {
        window.location.reload();
      }
    }
  
    
    criarForm(){
      this.formLogin = this.formBuilder.group({
        'id': new FormControl(null,[ Validators.required,Validators.minLength(1),Validators.maxLength(150)]),
        'idAfiliados': new FormControl(null,[ Validators.required,Validators.minLength(1),Validators.maxLength(150)]),
        'nomeFantasia': new FormControl(null,[ Validators.required,Validators.minLength(5),Validators.maxLength(150)]),
        'razaoSocial': new FormControl(null,[ Validators.required,Validators.minLength(5),Validators.maxLength(150)]),
        'email': new FormControl(null, [ Validators.required,Validators.minLength(1),Validators.maxLength(200)]),
        'cpfCnpj': new FormControl(null,[Validators.required, Validators.minLength(10),Validators.maxLength(14)]),
        'telefone': new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
        'whatsApp': new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
        'cep' :new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(200)]),
        'endereco' :new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(200)]),
        'estado': new FormControl(null, [Validators.required, Validators.minLength(2),Validators.maxLength(2)]),
        'cidade': new FormControl(null, [Validators.required, Validators.minLength(2),Validators.maxLength(150)]),
        'bairro': new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
        'plano': new FormControl(null, [Validators.required, Validators.minLength(1),Validators.maxLength(2)]),
        'responsavel': ['', []],
        'horarioAtendimento': ['', []],
        // 'senha': new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
      });
    }
  
    validateDvCpf():void {
      const cpfInformado = this.formLogin.controls['cpf'].value;
      const v =  validate(cpfInformado)
      if (!v && cpfInformado != null) {
        this.openDialogCpfDV()
        this.formLogin.controls['cpf'].reset();
        document.getElementById("cpf")?.focus();
      }
    }
  
    validarCPfUsuario() {
      const cpfInformado = this.formLogin.controls['cpf'].value;
        this._UsuariosService.consultaCpfUsuario(cpfInformado)
          .subscribe(ret => { 
            if (Object.keys(ret).length > 0 ) {
              this.validCpf = false
              this.openDialogCPF();
              this.formLogin.controls['cpf'].reset();
              document.getElementById("cpf")?.focus();
            }
            else {
              this.validCpf = true
            }
            });
    }
  
    openDialogCpfDV() {
      alert("CPF incorreto!")
    }
  
    openDialogCPF() {
      alert("Este CPF já foi cadastrado")
    }
  
    atualizar() {
      // this.btnDisable = true
      if (this.formLogin.valid && this.validCpf == true) {
        this._farmaciasService.AtualizarFarmacias(this.formLogin.value, this._id)
        .pipe(
          catchError((ret) => {
            this.sucesso = false;
            this.error = ret.error.error
            return of(false);
          })
        )
        .subscribe(ret =>
          { 
          window.scrollTo({top:0, behavior: 'smooth'});
          this.sucesso = true;
          this.onSubmitValidate = true;
          this.formLogin.reset();
          this.btnDisable = false;
          }
          );
      }
      else {
        // this.invalidCampos = true
      }
    }
  
    consutarEndereco() {
      const cep = this.formLogin.value['cep']
      if (cep) {
        this._UsuariosService.consultarCep(cep)
        .subscribe((ret:any) =>
          { 
         this.cep = ret
          }
          );
      }
      else {
        // this.invalidCampos = true
      }
    }

    getFarmacias(): void {
        this._farmaciasService.consultarFarmaciasId(this._id).subscribe((svc:any) => {
          this.farmacia = svc ? svc : [];
        });
    }
  
  
}
