import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { windowTime, windowToggle } from 'rxjs';
import { UtilizadorService } from 'src/app/services/utilizador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  formUtilizadores!: FormGroup;

  userValid: boolean = true;

  constructor(public utilizadorservice: UtilizadorService, public router: Router) { }

  ngOnInit() {
    this.formUtilizadores = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }


  verificaUtilizador() {

    this.utilizadorservice.getValidUtilizadorLogin(this.formUtilizadores.value.email,
      this.formUtilizadores.value.senha, this.formUtilizadores.value.activo).subscribe(data => {

        if (data.length > 0) {
          this.userValid = true;
          
          window.sessionStorage.setItem("userId", `${data[0].id}`);
          window.sessionStorage.setItem("userAdmin", `${data[0].admin}`);
          window.sessionStorage.setItem("userName", `${data[0].nome}`);
          this.router.navigate(['home']).then(() => {
            window.location.reload();
          });
        } else {
          this.userValid = false;
        }
      });
  }


  returnHome() {
    this.router.navigate(['home']);
  }

}
