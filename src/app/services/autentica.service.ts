import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from './mercado-livre.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticaService {
  private carrinho = new BehaviorSubject<Produto[]>([]);

  constructor() {}

  adicionarAoCarrinho(produto: Produto): Observable<void> {
    return new Observable(observer => {
      try {
        const carrinhoAtual = this.carrinho.value;
        const produtoExistente = carrinhoAtual.find(p => p.id === produto.id);

        if (produtoExistente) {
          produtoExistente.quantidade = (produtoExistente.quantidade || 1) + 1;
        } else {
          const novoProduto = { ...produto, quantidade: 1 };
          carrinhoAtual.push(novoProduto);
        }

        this.carrinho.next([...carrinhoAtual]);
        observer.next();
        observer.complete();
      } catch (error) {
        observer.error(new Error('Erro ao adicionar ao carrinho'));
      }
    });
  }

  atualizarQuantidade(produtoId: string, quantidade: number): Observable<void> {
    return new Observable(observer => {
      try {
        const carrinhoAtual = this.carrinho.value;
        const produto = carrinhoAtual.find(p => p.id === produtoId);

        if (!produto) {
          observer.error(new Error('Produto não encontrado no carrinho'));
          return;
        }

        if (quantidade < 1) {
          observer.error(new Error('Quantidade deve ser maior que zero'));
          return;
        }

        produto.quantidade = quantidade;
        this.carrinho.next([...carrinhoAtual]);
        observer.next();
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  getCarrinho(): Observable<Produto[]> {
    return this.carrinho.asObservable();
  }
}
