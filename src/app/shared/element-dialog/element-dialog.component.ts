import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from 'src/app/produto';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})

export class ElementDialogComponent implements OnInit{

  element! : Produto;
  isChange! : boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data : Produto,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    ){}

  ngOnInit() {
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
