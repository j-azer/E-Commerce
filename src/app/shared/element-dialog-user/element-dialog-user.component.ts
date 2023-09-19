import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utilizador } from 'src/app/utilizador';



@Component({
  selector: 'app-element-dialog-user',
  templateUrl: './element-dialog-user.component.html',
  styleUrls: ['./element-dialog-user.component.css']
})
export class ElementDialogUserComponent implements OnInit{
  

  element! : Utilizador;
  isChange! : boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data : Utilizador,
    public dialogRef: MatDialogRef<ElementDialogUserComponent>,
    ){}
  
  
  
  ngOnInit(){
    if(this.data.id != null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
  }


  onCancel() {
    this.dialogRef.close();
  }
  
  
}
