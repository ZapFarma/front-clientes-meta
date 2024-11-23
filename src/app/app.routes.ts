import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrimeiroAcesssoComponent } from './pages/primeiro-acesso/primeiro-acesso.component';
import { MensageriaComponent } from './pages/mensageria/mensageria.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EsqueceuSenhaComponent } from './pages/esqueceu-senha/esqueceu-senha.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'primeiro-acesso', component: PrimeiroAcesssoComponent },
    { path: 'mensageria', component: MensageriaComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'esqueceu-senha', component: EsqueceuSenhaComponent },
    
];
