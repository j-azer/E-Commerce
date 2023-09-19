import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Produto } from 'src/app/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-produto-crud',
  templateUrl: './produto-crud.component.html',
  styleUrls: ['./produto-crud.component.css'],
  providers: [ProdutoService]
})
export class ProdutoCrudComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTable)
  table!: MatTable<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'nome', 'marca', 'tipo_de_produto', 'cor', 'preco', 'descricao', 'foto_principal', 'foto_secundaria', 'destaque', 'operacao'];

  listaProdutosOriginal!: Produto[]

  
  dataSource: Produto[] = [];

  cpesquisa: string = '';


  constructor(public produtoservice: ProdutoService, public dialog: MatDialog) { }



  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.produtoservice.getProdutos().subscribe((data: Produto[]) => {
      this.dataSource = data;
      this.listaProdutosOriginal = data;
    });
  }


  openDialog(element: Produto | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      data: element === null ? {
        id: null,
        nome: '',
        marca: '',
        tipo_de_produto: '',
        cor: '',
        preco: null,
        descricao: '',
        destaque: false,
        foto_principal: '',
        foto_secundaria: ''

      } : {
        id: element.id,
        nome: element.nome,
        marca: element.marca,
        tipo_de_produto: element.tipo_de_produto,
        cor: element.cor,
        preco: element.preco,
        descricao: element.descricao,
        destaque: element.destaque,
        foto_principal: element.foto_principal,
        foto_secundaria: element.foto_secundaria
      }
    });

    dialogRef.afterClosed().subscribe((result: Produto) => {
      if (result !== null) {
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.produtoservice.editProduto(result).subscribe((data: Produto) => {
            const index = this.dataSource.findIndex(p => p.id === data.id);
            this.dataSource[index] = data;
            this.table.renderRows();
          });
        } else {
          this.produtoservice.createProduto(result)
            .subscribe((data: Produto) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }


  editarProduto(element: Produto) {
    this.openDialog(element);
  }


  excluirProduto(id: number) {
    alert('Tem certeza que deseja exluir permanentemente este produto?');
    this.produtoservice.deleteProduto(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== id);
    });

  }


  processaPesquisa() {
    this.dataSource = this.listaProdutosOriginal
      .filter(pruduto => pruduto.nome.toUpperCase().includes(this.cpesquisa.toUpperCase()));
  }

}
