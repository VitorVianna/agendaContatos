import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../../../services/contatos.service';
import { ContatoResponse } from '../../../models/contato.response';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { MessageComponent } from '../../layout/message/message.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-contacts',
  standalone: true,
  imports: [CommonModule, MessageComponent, NgxPaginationModule],
  templateUrl: './list-contacts.component.html',
  styleUrl: './list-contacts.component.css'
})
export class ListContactsComponent implements OnInit {

  contatos: ContatoResponse[] = [];
  mensagem: string = '';
  paginador: number = 1;

  constructor(
    private contatosService: ContatosService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.contatosService.get()
      .subscribe({
        next:(data) => {
          console.log(data);
          this.contatos = data;
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  onEdit(idContato:string) : void{

    idContato = CryptoJS.AES.encrypt(idContato,environment.cryptoKey).toString();

    this.router.navigate(['/app/edit-contacts',idContato])
  }

  onDelete(idContato:string) : void{
    if(confirm('Deseja realmente excluir o contato selecionado?')){
      this.contatosService.delete(idContato)
      .subscribe({
        next:(data) => {
          this.mensagem = `Contato '${data.nome}', excluído com sucesso.`;
          this.ngOnInit();
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
    
  }

  handlePageChange(event: any): void{
    this.paginador = event;
  }
}
