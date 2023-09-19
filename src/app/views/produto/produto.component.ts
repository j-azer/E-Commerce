import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Wishlist } from 'src/app/wishlist';



@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
});

export class ProdutoComponent implements OnInit {

  @ViewChild('saveUserNameCheckBox') saveUserNameCheckBox!: ElementRef<HTMLInputElement>;

  filtradoCor: string[] = [];

  filtradoTipo: string[] = [];

  listaProdutos: Produto[] = [];

  listaFiltroTipo: Map<any, any> = new Map();

  listaFiltroCor: Map<any, any> = new Map();

  existInMyWish: boolean = false;

  saveUsername!: boolean;

  wishlist!: Wishlist[];

  idUser!: number

  userExist: boolean = true;


  info: Produto = {
    id: 0, nome: '0', marca: '', tipo_de_produto: '',
    cor: '', preco: 0, descricao: '', destaque: false, foto_principal: '', foto_secundaria: '', favorito: false
  };


  constructor(public produtoservice: ProdutoService, public wishlistservice: WishlistService, private route: ActivatedRoute) { }


  ngOnInit() {    

    this.idUser = Number(window.sessionStorage.getItem("userId"));

    this.produtoservice.getProdutos().subscribe(produtos => {
      produtos.forEach(produto => {
        this.listaFiltroTipo.set(produto.tipo_de_produto, { selected: false, tipo: produto.tipo_de_produto });
        this.listaFiltroCor.set(produto.cor, { selected: false, cor: produto.cor });
      });
    });

    this.route.queryParams.subscribe((param: any) => {
      if(param.filter !== undefined) {
        this.filtroProdutos(param.filter);

      }else if(param.page !== undefined){
        this.pageProduct(param.page, param.limit);

      }else{
        this.pageProduct('1', '6');
      }
    });

    this.carregaWishList();
  }



  mostraDetalhe(id: number) {
    this.produtoservice.getProduto(id).subscribe(info => {
      this.info = info;

    });
  }



  carregaWishList() {
    this.wishlistservice.getMyWishlist(this.idUser).subscribe(wishlist => {
      this.wishlist = wishlist;
    });
  }


  toggleStar(id: number) {
    if (this.wishlist.findIndex(a => a.idProduto == id) > -1) {

      const idToDelete: number = this.wishlist?.filter(a => a.idProduto == id)[0].id!;

      this.wishlistservice.deleteProdutoMyWish(idToDelete).subscribe(() => {
        this.wishlist = this.wishlist.filter(a => a.id !== idToDelete);
      });
    } else {
      if (this.idUser > 0) {
        this.wishlistservice.createMyWishlist({ idUser: this.idUser, idProduto: id }).subscribe(wish => {
          this.wishlist.push(wish);
        });
      } else {
        alert('Precisa estar logado!!!')
      }
    }
  }



  isMyWish(id: number): boolean {
    return this.wishlist?.findIndex(a => a.idProduto === id) > -1;

  }


  filtroProdutos(param: string) {
    this.produtoservice.getProdutos().subscribe(produto => {
      if (param != null && param != undefined && param != '') {
        this.listaProdutos = produto.filter(x => x.tipo_de_produto === param || x.cor === param);
      } else {
        this.listaProdutos = produto;
      }
    });
  }


  filtro() {
    this.produtoservice.getProdutos().subscribe(produto => {

      if (this.filtradoTipo.length > 0 && this.filtradoCor.length > 0) {

        this.listaProdutos = produto.filter(x => this.filtradoTipo
          .includes(x.tipo_de_produto) && this.filtradoCor.includes(x.cor));

      } else if (this.filtradoTipo.length > 0 || this.filtradoCor.length > 0) {

        this.listaProdutos = produto.filter(x => this.filtradoTipo
          .includes(x.tipo_de_produto) || this.filtradoCor.includes(x.cor));

      } else {
        this.listaProdutos = produto;
      }
    });
  }


  filtroTipo(value: string) {
    let filtro = this.listaFiltroTipo.get(value);
    let checkChange = !filtro.selected;

    this.listaFiltroTipo.set(value, { selected: checkChange, tipo: value });
    this.filtradoTipo = [];
    this.listaFiltroTipo.forEach((qq: any, mm: any) => {
      if (qq.selected == true) {
        this.filtradoTipo.push(qq.tipo);
      }
    });
    this.filtro();
  }


  filtroCor(value: string) {

    let filtro = this.listaFiltroCor.get(value);
    let checkChange = !filtro.selected;

    this.listaFiltroCor.set(value, { selected: checkChange, cor: value });
    this.filtradoCor = [];
    this.listaFiltroCor.forEach((qq: any, mm: any) => {
      if (qq.selected == true) {
        this.filtradoCor.push(qq.cor);
      }
    });
    this.filtro();
  }


  pageProduct(page: string, limit: string) {
    this.produtoservice.getProdutoPage(page, limit).subscribe(res => {
      this.listaProdutos = res;
    });
  }

}

