import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { SobreNosComponent } from './components/sobre-nos/sobre-nos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'sobre-nos', component: SobreNosComponent }
];
