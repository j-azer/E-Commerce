import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilizadorService } from 'src/app/services/utilizador.service';
import { filter, pairwise } from 'rxjs';
import { Utilizador } from 'src/app/utilizador';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})




export class PerfilComponent implements OnInit {

  dataSource!: Utilizador[];
  formUtilizadores!: FormGroup;
  id!: number;
  utilizador!: Utilizador;

  constructor(private utilizadorservice: UtilizadorService, private rotaAtiva: ActivatedRoute) {

    this.utilizadorservice.getUtilizadores().subscribe((data: Utilizador[]) => {
      this.dataSource = data;
    });

  }


  ngOnInit() {

    this.formUtilizadores = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,30}$')]),
      morada: new FormControl('', [Validators.required, Validators.minLength(5)]),
      codigo_postal: new FormControl('', [Validators.required, Validators.minLength(5)]),
      pais: new FormControl('', Validators.required),
      activo: new FormControl(false),
      admin: new FormControl(false)
    });

    this.id = Number(window.sessionStorage.getItem("userId"));

    this.utilizadorservice.getUtilizador(this.id).subscribe((user: Utilizador) => {
      this.utilizador = user;
    });

  }

  editarPerfil(){
    this.utilizadorservice.editUtilizador(this.utilizador).subscribe((data: Utilizador) => {
      const index = this.dataSource.findIndex(p => p.id === data.id);
      this.dataSource[index] = data;
    });
    
  }


}
