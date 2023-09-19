import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoCrudComponent } from './admin/produto-crud/produto-crud.component';
import { UtilizadorCrudComponent } from './admin/utilizador-crud/utilizador-crud.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { PaginaerroComponent } from './views/paginaerro/paginaerro.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { ProdutoComponent } from './views/produto/produto.component';
import { RegistoComponent } from './views/registo/registo.component';
import { WishlistComponent } from './views/wishlist/wishlist.component';
import { CarrinhoComponent } from './views/carrinho/carrinho.component';


const routes: Routes = [
  { path:'', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch : 'full' },
  { path:'produto', component: ProdutoComponent },
  { path:'registo', component: RegistoComponent },
  { path:'login', component: LoginComponent },
  { path:'perfil', component: PerfilComponent },
  { path:'produto-crud', component: ProdutoCrudComponent },
  { path:'utilizador-crud', component: UtilizadorCrudComponent },
  { path:'wishlist', component: WishlistComponent },
  { path:'carrinho', component: CarrinhoComponent },

  { path: '**', component: PaginaerroComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
