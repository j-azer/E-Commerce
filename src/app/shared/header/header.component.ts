import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {


  controlButton : boolean = false;

  controlAdmin : boolean = false;

  userName : string = "";

  constructor(public router: Router){}


  ngOnInit(){

    const userId = Number(window.sessionStorage.getItem("userId"));
    const adminUser = window.sessionStorage.getItem("userAdmin");
  

    if(userId > 0){
      this.controlButton = true;
      this.controlAdmin = JSON.parse(adminUser || 'false');
      this.userName = window.sessionStorage.getItem("userName")||"";

    }else{
      this.controlButton = false;
    }
  }

  openRegisto() {
    this.router.navigate(['registo']);
  }

  logout(){
    window.sessionStorage.clear();
    this.controlButton = false;
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }

}
