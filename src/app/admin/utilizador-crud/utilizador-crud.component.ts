import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { UtilizadorService } from 'src/app/services/utilizador.service';
import { ElementDialogUserComponent } from 'src/app/shared/element-dialog-user/element-dialog-user.component';
import { Utilizador } from 'src/app/utilizador';

@Component({
  selector: 'app-utilizador-crud',
  templateUrl: './utilizador-crud.component.html',
  styleUrls: ['./utilizador-crud.component.css'],
  providers: [UtilizadorService]
})
export class UtilizadorCrudComponent implements OnInit{

  @ViewChild(MatTable)
  table!: MatTable<any>
  
  displayedColumns: string[] = ['id', 'nome', 'email', 'senha', 'morada','codigo_postal', 'pais', 'activo', 'admin', 'operacao'];

  listaUserOriginal! : Utilizador[] 
  
  dataSource!: Utilizador[];
  
  cpesquisa : string = '';

  constructor( public utilizadorservice : UtilizadorService, public dialog: MatDialog){ }

  
  ngOnInit() {

    this.utilizadorservice.getUtilizadores().subscribe((data: Utilizador[]) => {
      //console.log(data);
      this.dataSource = data;
      this.listaUserOriginal = data;
    });
  }


  openDialog(element: Utilizador | null): void {
    const dialogRef = this.dialog.open(ElementDialogUserComponent, {
      data: element === null ? {
        id: null,
        nome: '',
        email: '',
        senha: '',
        morada: '',
        codigo_postal:'',
        pais: '',
        activo: false,
        admin: false

      } : {
        id: element.id,
        nome: element.nome,
        email: element.email,
        senha: element.senha,
        morada: element.morada,
        codigo_postal:element.codigo_postal,
        pais: element.pais,
        activo: element.activo ,
        admin: element.admin
      }
    });

    dialogRef.afterClosed().subscribe((result: Utilizador) => {
      if (result !== null) {
        // console.log(result);
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.utilizadorservice.editUtilizador(result).subscribe((data: Utilizador) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = data;
            this.table.renderRows();            
          });
        } else {
          this.utilizadorservice.createUtilizador(result)
            .subscribe((data: Utilizador) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }


  editarUtilizador(element: Utilizador) {
    this.openDialog(element);
  }


  excluirUtilizador(id: number) {
    this.utilizadorservice.deleteUtilizador(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== id);
    });
  }


  processaPesquisa() {
    this.dataSource = this.listaUserOriginal
    .filter(user => user.nome.toUpperCase().includes(this.cpesquisa.toUpperCase()));
  }

}
