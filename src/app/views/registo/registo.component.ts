import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilizadorService } from 'src/app/services/utilizador.service';


@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {

  formUtilizadores!: FormGroup;


  constructor(public utilizadorservice: UtilizadorService, public router: Router) { }

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
  }


  insereUtilizador() {

    this.utilizadorservice.getValidUtilizador(this.formUtilizadores.value.email).subscribe(data => {
      //console.log(data);

      if (data.length > 0) {
        alert("Usuário já cadastrado!!");
        this.formUtilizadores.reset();
      } else {
        this.utilizadorservice.createUtilizador(this.formUtilizadores.value).subscribe({

          next: data => {
            this.formUtilizadores.reset();
            this.returnHome();
          },
          error: error => {
            alert("Não foi possível efetuar o cadastro.");
          }
        });
      }
    });

  }

  returnHome() {
    this.formUtilizadores.reset();
    this.router.navigate(['home']);
  }


}