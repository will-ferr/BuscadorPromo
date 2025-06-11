import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CompraFinalizadaComponent } from './components/compra-finalizada/compra-finalizada.component';
import { SobreNosComponent } from './components/sobre-nos/sobre-nos.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'carrinho', component: CarrinhoComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'compra-finalizada', component: CompraFinalizadaComponent, canActivate: [AuthGuard] },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'produto/:id', component: HomeComponent },
  { path: 'promocoes', component: HomeComponent },
  { path: '404', component: HomeComponent },
  { path: '**', redirectTo: '/404' }
];
