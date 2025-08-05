import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatNativeDateModule } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  dpto: string;
}

@Component({
  selector: 'front-zapfarma-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss'],
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

  ],
  providers: [FarmaciasService, provideNgxMask(),],
  
})
export class EmpresasComponent {
  @ViewChild('tableScroll') matElements: ElementRef<HTMLTableElement> =
    {} as ElementRef;
  displayedColumns: string[] = [
    'nomeFantasia',
    'afiliados',
    'whatsApp',
    'nomePlanos',
    'cep',
    'data',
  ];
  dataSource: MatTableDataSource<UserData>;
  dadosNotificacao = '';
  dadosNotificacaoNome = '';
  name = '';
  usuario:any;
  loadSkeleton = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svc: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selection = new SelectionModel<any>(true, []);
  // eslint-disable-next-line @typescript-eslint/ban-types

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _farmaciasService: FarmaciasService,
    private activatedRoute: ActivatedRoute,
    private _usuariosService: UsuariosService,
    
    
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      const id = params['id'];
      const nome = params['nome'];
      this.dadosNotificacao = id;
      this.dadosNotificacaoNome = nome;
    });
    this.usuario = this._usuariosService.obterUsuarioLogado;
    this.getFarmacias();
  }

  irCadastrar() {
    this.router.navigate(['/cadastro-empresas']);
  }

  irAtualizar(id: any) {
    this.router.navigate(['/editar-empresas'], { queryParams: { id: id } })
  }

  getFarmacias(): void {
    this.loadSkeleton = true;
    if(!this.dadosNotificacao) {
      if(!this.usuario.admin) {
        this._farmaciasService.consultarFarmaciasAfiliados().subscribe((svc:any) => {
          this.svc = svc ? svc : [];
          this.svc.forEach((e: any, i: number) => {
            // this.svc[i].aprovado = e.aprovado === true ? 'Sim': 'Não';
            // this.svc[i].data = this.dataConvertida(e.data);
          });
          this.dataSource = new MatTableDataSource(this.svc ? this.svc : []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loadSkeleton = false;
        });
      } else {
        this._farmaciasService.consultarFarmacias().subscribe((svc:any) => {
          this.svc = svc ? svc?.farmacias : [];
          this.svc.forEach((e: any, i: number) => {
            // this.svc[i].aprovado = e.aprovado === true ? 'Sim': 'Não';
            this.svc[i].nomeAfiliados = e.afiliados.nome;
            this.svc[i].nomePlanos = e.planos.nome;
          });
          this.dataSource = new MatTableDataSource(this.svc ? this.svc : []);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loadSkeleton = false;
        });
      }
    } else {
      this._farmaciasService.consultarFarmaciasAfiliadosCPF(this.dadosNotificacao).subscribe((svc:any) => {
        this.svc = svc ? svc?.farmacias : [];
        this.svc = svc ? svc : [];
        this.svc.forEach((e: any, i: number) => {
          // this.svc[i].aprovado = e.aprovado === true ? 'Sim': 'Não';
          // this.svc[i].data = this.dataConvertida(e.data);
          this.svc[i].nomeAfiliados = this.dadosNotificacaoNome;
          
        });
        this.dataSource = new MatTableDataSource(this.svc ? this.svc : []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loadSkeleton = false;
      });
    }
  }

  dataConvertida(data: Date): string {
    const d = new Date(data);
    const dia = d.getDate().toString();
    const diaF = dia.length == 1 ? '0' + dia : dia;
    const mes = (d.getMonth() + 1).toString(); //+1 pois no getMonth Janeiro começa com zero.
    const mesF = mes.length == 1 ? '0' + mes : mes;
    const anoF = d.getFullYear();
    return diaF + '/' + mesF + '/' + anoF;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.selection.selected.length > 0) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  clickScroll() {
    this.matElements.nativeElement.animate(
      { scrollLeft: this.matElements.nativeElement.offsetLeft },
      500
    );
  }
}
