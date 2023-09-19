import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Wishlist } from 'src/app/wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  listaProdutos: Produto[] = [];

  listaWish : Produto[] = [];

  wishlist!: Wishlist[];

  idUser!: number

  info: Produto = {
    id: 0, nome: '0', marca: '', tipo_de_produto: '',
    cor: '', preco: 0, descricao: '', destaque: false, foto_principal: '', foto_secundaria: '', favorito: false
  };

  constructor(public produtoservice: ProdutoService, public wishlistservice: WishlistService) { }


  ngOnInit() {

    this.idUser = Number(window.sessionStorage.getItem("userId"));
    this.carregaWishList();
  }


  carregaWishList() {

    this.produtoservice.getProdutos().subscribe(produtos => {
      this.listaProdutos = produtos;
      this.wishlistservice.getMyWishlist(this.idUser).subscribe(wishlist => {
        this.wishlist = wishlist;
        if(wishlist.length > 0){
          
          this.wishlist.forEach(wish =>{
            let produtoWish = this.listaProdutos.find( a => a.id === wish.idProduto);
            this.listaWish.push(produtoWish!);
          });
        }
      });
    });
  }

  excluirWish(id: number) {
    
    if (this.wishlist?.findIndex(a => a.idProduto === id) > -1) {

      const idToDelete: number = this.wishlist?.filter(a => a.idProduto === id)[0].id!;
      this.wishlistservice.deleteProdutoMyWish(idToDelete).subscribe(() => {
        this.wishlist = this.wishlist.filter(a => a.id !== idToDelete);
        window.location.reload();
      });
    }
  }

}
