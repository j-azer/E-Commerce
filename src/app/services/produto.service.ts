import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../produto';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  private urlAPI = " http://localhost:3000/produtos";
  
  constructor(private httpClient : HttpClient) { }

  getProdutos() {
    return this.httpClient.get<Produto[]>(`${this.urlAPI}`);
  }

  getProduto(id : number) {
    return this.httpClient.get<Produto>(`${this.urlAPI}/${id}`)
  }

  createProduto(produto : Produto){
    produto.id = Number(produto.id);
    return this.httpClient.post<Produto>(this.urlAPI, produto);
  }

  editProduto(produto : Produto){
    produto.id = Number(produto.id);
    produto.destaque = Boolean(produto.destaque);
    return this.httpClient.put<Produto>(`${this.urlAPI}/${produto.id}`, produto);
  }

  deleteProduto(id : number) {
    return this.httpClient.delete<Produto[]>(`${this.urlAPI}/${id}`)
     
  }

  getProdutoPage(page:string, limit:string) {
    return this.httpClient.get<Produto[]>(`${this.urlAPI}?_page=${page}&_limit=${limit}`);
  }

}
