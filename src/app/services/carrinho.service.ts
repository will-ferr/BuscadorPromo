import { Injectable } from '@angular/core';
import { Produto } from './mercado-livre.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinho: Produto[] = [];

  constructor() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
  }

  adicionarProduto(produto: Produto): void {
    const produtoExistente = this.carrinho.find(p => p.id === produto.id);
    if (!produtoExistente) {
      this.carrinho.push(produto);
      this.salvarCarrinho();
    }
  }

  removerProduto(produtoId: string): void {
    this.carrinho = this.carrinho.filter(p => p.id !== produtoId);
    this.salvarCarrinho();
  }

  getCarrinho(): Produto[] {
    return [...this.carrinho];
  }

  limparCarrinho(): void {
    this.carrinho = [];
    this.salvarCarrinho();
  }

  private salvarCarrinho(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }

  getTotal(): number {
    return this.carrinho.reduce((total, produto) => total + produto.price.amount, 0);
  }
}
