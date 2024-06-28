import { Component, OnInit } from '@angular/core';
import { ListaService, Lista } from '../../../services/lista.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CurrencyFormatPipe } from '../../../pipes/currency-format';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyFormatPipe],
})
export class ListasComponent implements OnInit {
  listas: Lista[] = [];

  constructor(private listaService: ListaService) {}

  ngOnInit() {
    const userId = '1';
    this.listaService.getListasByUserId(userId).subscribe(
      (listas) => {
        this.listas = listas;
      },
      (error) => {
        console.error('Erro ao carregar listas:', error);
      }
    );
  }
}
