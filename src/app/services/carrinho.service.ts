import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from './mercado-livre.service';
import { AutenticaçãoService } from './autenticação.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ItemCarrinho {
  id: number;
  produto: Produto;
  usuarioId: number;
  quantidade: number;
}

export interface ItemCarrinho {
  id: number;
  produto: Produto;
  usuarioId: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private apiUrl = 'http://localhost:3000';
  private carrinho: ItemCarrinho[] = [];

  constructor(
    private http: HttpClient,
    private autenticacaoService: AutenticaçãoService
  ) {
    this.carregarCarrinho();
  }

  private carregarCarrinho(): void {
    const usuario = this.autenticacaoService.getUsuarioLogado();
    if (usuario) {
      this.http.get<ItemCarrinho[]>(`${this.apiUrl}/itensCarrinho?usuarioId=${usuario.id}`)
        .subscribe(itens => {
          this.carrinho = itens;
        });
    }
  }

  adicionarProduto(produto: Produto): Observable<ItemCarrinho> {
    const usuario = this.autenticacaoService.getUsuarioLogado();
    if (!usuario) {
      throw new Error('Por favor, faça login para adicionar itens ao carrinho');
    }

    // Verifica se o produto já está no carrinho
    const itemExistente = this.carrinho.find(item => item.produto.id === produto.id);
    
    if (itemExistente) {
      // Se o item já existe, incrementa a quantidade
      return this.http.patch<ItemCarrinho>(`${this.apiUrl}/itensCarrinho/${itemExistente.id}`, {
        quantidade: itemExistente.quantidade + 1
      }).pipe(
        map(itemAtualizado => {
          const index = this.carrinho.findIndex(i => i.id === itemAtualizado.id);
          if (index !== -1) {
            this.carrinho[index] = itemAtualizado;
          }
          return itemAtualizado;
        })
      );
    }

    // Se o item não existe, adiciona novo
    const item: ItemCarrinho = {
      id: 0, // será gerado pelo json-server
      produto,
      usuarioId: usuario.id,
      quantidade: 1
    };

    return this.http.post<ItemCarrinho>(`${this.apiUrl}/itensCarrinho`, item).pipe(
      map(novoItem => {
        this.carrinho.push(novoItem);
        return novoItem;
      })
    );
  }

  removerProduto(produtoId: string): Observable<void> {
    const item = this.carrinho.find(i => i.produto.id === produtoId);
    if (item) {
      return this.http.delete<void>(`${this.apiUrl}/itensCarrinho/${item.id}`).pipe(
        map(() => {
          this.carrinho = this.carrinho.filter(i => i.id !== item.id);
        })
      );
    }
    return new Observable<void>(subscriber => subscriber.next());
  }

  getCarrinho(): ItemCarrinho[] {
    const usuario = this.autenticacaoService.getUsuarioLogado();
    if (!usuario) {
      return [];
    }
    return this.carrinho.filter(item => item.usuarioId === usuario.id);
  }

  limparCarrinho(): Observable<void> {
    const usuario = this.autenticacaoService.getUsuarioLogado();
    if (usuario) {
      return this.http.delete<void>(`${this.apiUrl}/itensCarrinho?usuarioId=${usuario.id}`).pipe(
        map(() => {
          this.carrinho = [];
        })
      );
    }
    return new Observable<void>(subscriber => subscriber.next());
  }

  getTotal(): number {
    if (!this.carrinho || this.carrinho.length === 0) return 0;
    
    return this.carrinho.reduce((total, item) => {
      if (typeof item.produto.price !== 'number') return total;
      return total + (item.produto.price * item.quantidade);
    }, 0);
  }

  atualizarItemCarrinho(itemAtualizado: ItemCarrinho): Observable<ItemCarrinho> {
    if (!this.autenticacaoService.getUsuarioLogado()) {
      throw new Error('Usuário não autenticado');
    }

    return this.http.put<ItemCarrinho>(`${this.apiUrl}/itensCarrinho/${itemAtualizado.id}`, itemAtualizado).pipe(
      map(item => {
        const index = this.carrinho.findIndex(i => i.id === item.id);
        if (index !== -1) {
          this.carrinho[index] = item;
        }
        return item;
      })
    );
  }
}
