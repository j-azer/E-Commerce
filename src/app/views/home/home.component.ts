import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  listaProdutos: Produto[] = [];

  info: Produto = {
    id: 0, nome: '0', marca: '', tipo_de_produto: '',
    cor: '', preco: 0, descricao: '', destaque: false, foto_principal: '', foto_secundaria: '', favorito:false
  };

  constructor(public produtoservice: ProdutoService) { }

  ngOnInit() {

    this.produtoservice.getProdutos().subscribe(produto => {
      this.listaProdutos = produto;
    })
  }



  mostraDetalhe(id: number) {

    this.produtoservice.getProduto(id).subscribe(info => {
      this.info = info;

    });

  }

}
