import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../../services/mercado-livre.service';

@Component({
  selector: 'app-produto-card',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div class="produto-card">
      <div class="produto-imagem">
        <img [src]="produto.thumbnail || 'https://via.placeholder.com/200'" 
             [alt]="produto.title" 
             loading="lazy" />
        <div class="desconto-badge" *ngIf="produto.discount !== undefined && produto.discount !== null">
          {{ produto.discount }}% OFF
        </div>
      </div>
      <div class="produto-detalhes">
        <h3>{{ produto.title }}</h3>
        <div class="preco-container">
          <span class="preco" *ngIf="produto.price !== undefined && produto.price !== null">
            R$ {{ produto.price | number:'1.2-2' }}
          </span>
          <span class="preco-original" *ngIf="produto.originalPrice !== undefined && produto.originalPrice !== null">
            De: R$ {{ produto.originalPrice | number:'1.2-2' }}
          </span>
        </div>
        <div class="frete" *ngIf="produto.shipping?.free_shipping">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M17.41 7.41L18.83 8.83l-4.88 4.88-4.88-4.88L6.59 8.83 12 14.25 17.41 8.83z"/>
          </svg>
          Frete grátis
        </div>
        <div class="parcelamento" *ngIf="produto.installments && produto.installments.quantity > 1">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M20 5v14H4V5h16m2-2H2v18l4-4h14l4 4V3z"/>
          </svg>
          {{ produto.installments.quantity }}x de R$ {{ produto.installments.amount | number:'1.2-2' }}
        </div>
      </div>
      <div class="acoes">
        <button (click)="verNoMercadoLivreHandler()" class="mercado-livre-btn" [disabled]="!produto.permalink">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
          </svg>
          Ver no Mercado Livre
        </button>
        <button (click)="adicionarAoCarrinhoHandler()" class="carrinho-btn">
          <svg class="icon" viewBox="0 0 24 24">
            <path d="M17 21h-6v-6h6v6zm-8 0h-6v-6h6v6zm12-18c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16.5c-3.59 0-6.5-2.91-6.5-6.5S12.91 5 16.5 5 23 7.91 23 11.5 19.59 17.5 16.5 17.5zm0-14.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/>
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  `,
  styles: [`
    .produto-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: all 0.3s ease;
      width: 280px;
      margin-bottom: 24px;
      position: relative;
    }

    .icon {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    .frete .icon {
      fill: #4CAF50;
    }

    .parcelamento .icon {
      fill: #2196F3;
    }

    .mercado-livre-btn .icon {
      fill: currentColor;
    }

    .carrinho-btn .icon {
      fill: currentColor;
    }

    .produto-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0,0,0,0.15);
    }

    .produto-imagem {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      padding: 16px;
    }

    .produto-imagem img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .produto-detalhes {
      padding: 16px;
      margin-bottom: 16px;
      min-height: 120px;
    }

    .produto-detalhes h3 {
      font-size: 1.1em;
      margin: 0 0 8px 0;
      color: #333;
      line-height: 1.4;
    }

    .preco-container {
      margin: 8px 0;
      font-weight: bold;
    }

    .preco {
      color: #2196F3;
      font-size: 1.3em;
    }

    .preco-original {
      color: #666;
      text-decoration: line-through;
      margin-left: 8px;
    }

    .frete {
      color: #4CAF50;
      font-size: 0.9em;
      margin: 8px 0;
      display: flex;
      align-items: center;
    }

    .frete i {
      margin-right: 4px;
    }

    .parcelamento {
      color: #666;
      font-size: 0.9em;
      margin: 8px 0;
      display: flex;
      align-items: center;
    }

    .parcelamento i {
      margin-right: 4px;
      color: #2196F3;
    }

    .acoes {
      display: flex;
      gap: 8px;
      padding: 16px;
      border-top: 1px solid #eee;
    }

    .mercado-livre-btn,
    .carrinho-btn {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .mercado-livre-btn {
      background: #2196F3;
      color: white;
    }

    .mercado-livre-btn:hover:not(:disabled) {
      background: #1976D2;
    }

    .carrinho-btn {
      background: #4CAF50;
      color: white;
    }

    .carrinho-btn:hover:not(:disabled) {
      background: #388E3C;
    }

    .mercado-livre-btn:disabled,
    .carrinho-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .desconto-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: #f44336;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8em;
      font-weight: bold;
    }
  `]
})
export class ProdutoCardComponent {
  @Input() produto!: Produto;
  @Output() adicionarAoCarrinho = new EventEmitter<Produto>();
  @Output() verNoMercadoLivre = new EventEmitter<void>();

  adicionarAoCarrinhoHandler(): void {
    const produtoParaAdicionar = { ...this.produto, quantidade: 1 };
    this.adicionarAoCarrinho.emit(produtoParaAdicionar);
  }

  verNoMercadoLivreHandler(): void {
    this.verNoMercadoLivre.emit();
  }
}
