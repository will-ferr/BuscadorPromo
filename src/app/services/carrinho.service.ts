import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Produto } from './mercado-livre.service';
import { AutenticaçãoService } from './autenticação.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Erro ao carregar carrinho:', error);
            return of([] as ItemCarrinho[]);
          })
        )
        .subscribe({
          next: (itens: ItemCarrinho[] | null) => {
            this.carrinho = itens || [];
          },
          error: (error: Error) => {
            console.error('Erro na subscrição do carrinho:', error);
            this.carrinho = [];
          }
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
          return undefined;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao remover produto do carrinho:', error);
          return throwError(() => new Error('Não foi possível remover o produto do carrinho'));
        })
      );
    }
    return of(undefined);
  }

  getCarrinho(): ItemCarrinho[] {
    try {
      const usuario = this.autenticacaoService.getUsuarioLogado();
      if (!usuario) {
        return [];
      }
      return this.carrinho.filter(item => item && item.usuarioId === usuario.id);
    } catch (error) {
      console.error('Erro ao obter carrinho:', error);
      return [];
    }
  }

  limparCarrinho(): Observable<void> {
    const usuario = this.autenticacaoService.getUsuarioLogado();
    if (usuario) {
      return this.http.delete<void>(`${this.apiUrl}/itensCarrinho?usuarioId=${usuario.id}`).pipe(
        map(() => {
          this.carrinho = [];
          return undefined;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro ao limpar carrinho:', error);
          return throwError(() => new Error('Não foi possível limpar o carrinho'));
        })
      );
    }
    return of(undefined);
  }

  getTotal(): number {
    try {
      if (!this.carrinho || this.carrinho.length === 0) return 0;
      
      return this.carrinho.reduce((total, item) => {
        if (!item || !item.produto || typeof item.produto.price !== 'number' || typeof item.quantidade !== 'number') {
          return total;
        }
        return total + (item.produto.price * item.quantidade);
      }, 0);
    } catch (error) {
      console.error('Erro ao calcular total do carrinho:', error);
      return 0;
    }
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
