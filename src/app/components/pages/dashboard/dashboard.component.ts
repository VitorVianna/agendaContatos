import { Component, OnInit } from '@angular/core';
import { ContatosService } from '../../../services/contatos.service';
import { CommonModule } from '@angular/common';
import { Chart, ChartModule } from 'angular-highcharts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  grafico: Chart = new Chart();
  tipoGrafico: string = 'column';

  constructor(
    private contatosService: ContatosService,
  ){}

  ngOnInit(): void {
    this.contatosService.getDashboard()
      .subscribe({
        next: (data) => {
          const dados: any[] = [];
          const nomes: any[] = [];

          data.map(item => {
            dados.push([item.name, item.data]);
            nomes.push(item.name);
          });
          this.grafico = new Chart({
            chart: {type: this.tipoGrafico},
            title: {text: "Quantidade de Contatos Cadastrados."},
            subtitle: {text: "Somatório de cadastro de contatos por data."},
            series: [{
              data: dados,
              type: undefined as any
            }],
            xAxis:{
              categories: nomes
            },
            legend: {enabled: false },
            credits: {enabled: false }
          });
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

}
