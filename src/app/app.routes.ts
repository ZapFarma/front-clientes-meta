import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrimeiroAcesssoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';
import { MensageriaComponent } from './pages/mensageria/mensageria.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EsqueceuSenhaComponent } from './pages/esqueceu-senha/esqueceu-senha.component';
import { ContatoClienteComponent } from './pages/contato-cliente/contato-cliente.component';
import { PlanosComponent } from './pages/planos/planos.component';
import { AreaLogadaComponent } from './pages/area-logada/area-logada.component';
import { CadastroEmpresasComponent } from './pages/empresas/cadastro/cadastro-empresas.component'
import { CadastroAfiliadosComponent } from './pages/cadastro-afiliados/cadastro-afiliados.component';
import { NovoUsuarioComponent } from './pages/novo-usuario/novo-usuario.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.gard';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.gard';
import { EditarEmpresasComponent } from './pages/empresas/editar/editar-empresas.component';
import { AlterarSenhaComponent } from './pages/alterar-senha/alterar-senha.component';
import { TreinamentosComponent } from './pages/treinamentos/treinamentos.component';
import { MapsComponent } from './pages/maps/maps.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { PoliticaPrivacidadeComponent } from './pages/politica-privacidade/politica-privacidade.component';


export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
    { path: 'primeiro-acesso', component: PrimeiroAcesssoComponent },
    { path: 'mensageria', component: MensageriaComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [UsuarioAutenticadoGuard] },
    { path: 'empresas', component: EmpresasComponent, canActivate: [UsuarioAutenticadoGuard]  },
    { path: 'esqueceu-senha', component: EsqueceuSenhaComponent },
    { path: 'alterar-senha', component: AlterarSenhaComponent },
    { path: 'contato-cliente', component: ContatoClienteComponent },
    { path: 'planos', component: PlanosComponent, canActivate: [UsuarioAutenticadoGuard]  },
    { path: 'area-loagada', component: AreaLogadaComponent, canActivate: [UsuarioAutenticadoGuard] },
    { path: 'cadastro-empresas', component: CadastroEmpresasComponent, canActivate: [UsuarioAutenticadoGuard] },
    { path: 'editar-empresas', component: EditarEmpresasComponent, canActivate: [UsuarioAutenticadoGuard] },
    { path: 'cadastro-afiliados', component: CadastroAfiliadosComponent, canActivate: [UsuarioAutenticadoGuard] },
    { path: 'novo-usuario', component: NovoUsuarioComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
    { path: 'usuarios-afiliados', component: UsuariosComponent, canActivate: [UsuarioAutenticadoGuard] },
    { path: 'treinamentos', component: TreinamentosComponent, canActivate: [UsuarioAutenticadoGuard] },
    { path: 'maps', component: MapsComponent, canActivate: [UsuarioAutenticadoGuard] },
    { path: 'sobre', component: SobreComponent},
    { path: 'politica-privacidade', component: PoliticaPrivacidadeComponent},
    
];

import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

// Se o projeto usa o novo standalone API do Angular (sem NgModule):
export const appRouterProviders = [
  provideRouter(
    routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  )
];

