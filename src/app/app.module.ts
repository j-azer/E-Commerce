import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PaginaerroComponent } from './views/paginaerro/paginaerro.component';
import { ProdutoComponent } from './views/produto/produto.component';
import { LoginComponent } from './views/login/login.component';
import { RegistoComponent } from './views/registo/registo.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { ElementDialogComponent } from './shared/element-dialog/element-dialog.component';
import { ProdutoCrudComponent } from './admin/produto-crud/produto-crud.component';
import { UtilizadorCrudComponent } from './admin/utilizador-crud/utilizador-crud.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementDialogUserComponent } from './shared/element-dialog-user/element-dialog-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WishlistComponent } from './views/wishlist/wishlist.component';
import { CarrinhoComponent } from './views/carrinho/carrinho.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PaginaerroComponent,
    ProdutoComponent,
    LoginComponent,
    RegistoComponent,
    PerfilComponent,
    ElementDialogComponent,
    ProdutoCrudComponent,
    UtilizadorCrudComponent,
    ElementDialogUserComponent,
    WishlistComponent,
    CarrinhoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
