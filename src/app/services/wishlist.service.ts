import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wishlist } from '../wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private urlAPI = " http://localhost:3000/wishlist";

  constructor(private httpClient : HttpClient) { }

  getMyWishlist(idUser : number) {
    return this.httpClient.get<Wishlist[]>(`${this.urlAPI}?idUser=${idUser}`);
  }

  createMyWishlist(wishlist : Wishlist){
    wishlist.idUser = Number(wishlist.idUser);
    wishlist.idProduto = Number(wishlist.idProduto);
    return this.httpClient.post<Wishlist>(this.urlAPI, wishlist);
  }

  deleteProdutoMyWish(id : number) {
    return this.httpClient.delete<Wishlist[]>(`${this.urlAPI}/${id}`);
  }
}
