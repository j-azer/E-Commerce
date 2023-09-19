import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Utilizador } from '../utilizador';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  private urlAPI = " http://localhost:3000/utilizadores";

  

  constructor(private httpClient : HttpClient) { }

  getUtilizadores() {
    return this.httpClient.get<Utilizador[]>(`${this.urlAPI}`);
  }

  getValidUtilizador(email:string) {
    return this.httpClient.get<Utilizador[]>(`${this.urlAPI}?email=${email}`);
  }

  getValidUtilizadorLogin(email:string, senha:string, activo:boolean) {
    return this.httpClient.get<Utilizador[]>(`${this.urlAPI}?email=${email}&senha=${senha}&activo=${true}`);
  }

  getUtilizador(id : number)  {
    return this.httpClient.get<Utilizador>(`${this.urlAPI}/${id}`)
  }

  createUtilizador(utilizador : Utilizador){
    return this.httpClient.post<Utilizador>(this.urlAPI, utilizador);
  }

  editUtilizador(utilizador : Utilizador){
    utilizador.id = Number(utilizador.id );
    utilizador.activo = Boolean(utilizador.activo);
    return this.httpClient.put<Utilizador>(`${this.urlAPI}/${utilizador.id }`, utilizador);
  }

  deleteUtilizador(id : number) {
    return this.httpClient.delete<Utilizador[]>(`${this.urlAPI}/${id}`)
     
  }

}
