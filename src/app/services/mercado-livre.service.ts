import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { CacheService } from './cache.service';

export interface Paginacao {
  paginaAtual: number;
  totalPaginas: number;
  produtos: Produto[];
}

export interface Produto {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  thumbnail: string;
  shipping: {
    free_shipping: boolean;
  };
  installments?: {
    quantity: number;
    amount: number;
  };
  permalink: string;
  quantidade?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MercadoLivreService {
  private readonly baseUrl = 'https://api.mercadolibre.com';

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {}

  buscarProdutos(termo: string, categoria?: string, pagina = 1): Observable<Paginacao> {
    const cacheKey = `produtos_${termo}_${categoria}_${pagina}`;
    const cachedData = this.cacheService.get(cacheKey);

    if (cachedData) {
      return of(cachedData as Paginacao);
    }

    const params = new HttpParams()
      .set('q', termo)
      .set('category', categoria || '')
      .set('offset', ((pagina - 1) * 50).toString())
      .set('limit', '50');

    return this.http.get<any>(`${this.baseUrl}/sites/MLB/search`, { params })
      .pipe(
        retry(3),
        map((response: any): Paginacao => {
          if (!response.results || response.results.length === 0) {
            throw new Error('Nenhum produto encontrado');
          }

          const paginacao: Paginacao = {
            paginaAtual: pagina,
            totalPaginas: Math.ceil(response.paging.total / 50),
            produtos: response.results.map((produto: any): Produto => ({
              id: produto.id,
              title: produto.title,
              price: Number(produto.price),
              originalPrice: produto.original_price ? Number(produto.original_price) : undefined,
              discount: produto.discount_percentage ? Number(produto.discount_percentage) : undefined,
              thumbnail: produto.thumbnail,
              shipping: {
                free_shipping: produto.shipping?.free_shipping || false
              },
              installments: produto.installments ? {
                quantity: Number(produto.installments.quantity) || 1,
                amount: Number(produto.installments.amount) || Number(produto.price)
              } : undefined,
              permalink: produto.permalink
            }))
          };
          
          this.cacheService.set(cacheKey, paginacao);
          return paginacao;
        }),
        catchError((error: any) => {
          console.error('Erro ao buscar produtos:', error);
          throw new Error('Erro ao buscar produtos');
        })
      );
  }

  buscarCategorias(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories`);
  }

  buscarSugestoes(categoria: string = 'MLB1051'): Observable<{ results: Produto[] }> {
    return this.http.get<{ results: Produto[] }>(`${this.baseUrl}/sites/MLB/search?category=${categoria}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar sugestões:', error);
          return of({ results: [] });
        })
      );
  }
}
