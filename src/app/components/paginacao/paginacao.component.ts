import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paginacao } from '../../services/mercado-livre.service';

@Component({
  selector: 'app-paginacao',
  template: `
    <div class="pagination-container">
      <button 
        class="pagination-button"
        [disabled]="!paginaAtual || paginaAtual <= 1"
        (click)="irParaPagina(1)">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5L12 7l-10 5z"/>
        </svg>
        Primeira
      </button>
      
      <button 
        class="pagination-button"
        [disabled]="!paginaAtual || paginaAtual <= 1"
        (click)="paginaAnterior()">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
        Anterior
      </button>

      <span class="page-number">
        Página {{ paginaAtual }} de {{ totalPaginas }}
      </span>

      <button 
        class="pagination-button"
        [disabled]="!paginaAtual || paginaAtual >= totalPaginas"
        (click)="proximaPagina()">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
        Próxima
      </button>

      <button 
        class="pagination-button"
        [disabled]="!paginaAtual || paginaAtual >= totalPaginas"
        (click)="irParaUltimaPagina()">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M12 2l10 5-10 5-10-5 10-5zm0 15l-10-5 10-5 10 5-10 5z"/>
        </svg>
        Última
      </button>
    </div>
  `,
  styles: [`
    .pagination-container {
      display: flex;
      gap: 12px;
      padding: 16px;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .pagination-button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background: #007bff;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pagination-button:hover:not(:disabled) {
      background: #0056b3;
      transform: translateY(-1px);
    }

    .pagination-button:disabled {
      background: #cccccc;
      cursor: not-allowed;
      opacity: 0.7;
    }

    .pagination-button .icon {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }

    .page-number {
      font-weight: bold;
      color: #333;
      font-size: 1.1em;
    }
  `],
  imports: [CommonModule],
  standalone: true
})
export class PaginacaoComponent {
  @Input() paginaAtual!: number;
  @Input() totalPaginas!: number;
  @Output() mudarPagina = new EventEmitter<number>();

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.mudarPagina.emit(this.paginaAtual - 1);
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.mudarPagina.emit(this.paginaAtual + 1);
    }
  }

  irParaPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.mudarPagina.emit(pagina);
    }
  }

  irParaUltimaPagina(): void {
    if (this.totalPaginas > 0) {
      this.mudarPagina.emit(this.totalPaginas);
    }
  }
}
