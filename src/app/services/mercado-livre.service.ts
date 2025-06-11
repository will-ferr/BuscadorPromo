import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { CacheService } from './cache.service';

export interface Paginacao {
  paginaAtual: number;
  totalPaginas: number;
  produtos: Produto[];
}
=======
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
>>>>>>> origin/main

export interface Produto {
  id: string;
  title: string;
<<<<<<< HEAD
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
=======
  price: {
    currency_id: string;
    amount: number;
    decimals: number;
  };
  thumbnail: string;
  discount?: number;
  originalPrice?: number;
  available_quantity: number;
>>>>>>> origin/main
}

@Injectable({
  providedIn: 'root'
})
export class MercadoLivreService {
<<<<<<< HEAD
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
=======
  // Dados mockados para uso em demonstração
  private mockProdutos: Produto[] = [
    {
      id: '101',
      title: 'Fone de Ouvido Bluetooth ProSound X900',
      price: {
        currency_id: 'BRL',
        amount: 299.99,
        decimals: 2
      },
      thumbnail: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=500&auto=format&fit=crop',
      discount: 30,
      originalPrice: 429.99,
      available_quantity: 120
    },
    {
      id: '102',
      title: 'Smartwatch FitPro Premium Edition',
      price: {
        currency_id: 'BRL',
        amount: 399.99,
        decimals: 2
      },
      thumbnail: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=500&auto=format&fit=crop',
      discount: 25,
      originalPrice: 549.99,
      available_quantity: 85
    },
    {
      id: '103',
      title: 'Console GameMax Ultra 4K',
      price: {
        currency_id: 'BRL',
        amount: 2799.90,
        decimals: 2
      },
      thumbnail: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=500&auto=format&fit=crop',
      discount: 15,
      originalPrice: 3299.90,
      available_quantity: 40
    }
  ];

  private mockCategorias = [
    { id: 'MLB1051', name: 'Celulares e Smartphones' },
    { id: 'MLB1648', name: 'Informática' },
    { id: 'MLB1039', name: 'Câmeras e Acessórios' },
    { id: 'MLB1144', name: 'Games e Consoles' },
    { id: 'MLB1000', name: 'Eletrônicos, Áudio e Vídeo' },
    { id: 'MLB5726', name: 'Eletrodomésticos' },
    { id: 'MLB1246', name: 'Beleza e Cuidado Pessoal' },
    { id: 'MLB1574', name: 'Esportes e Fitness' }
  ];

  constructor(private http: HttpClient) { }

  buscarProdutos(termo: string, categoria?: string): Observable<Produto[]> {
    // Retorna os produtos mockados em vez de chamar a API
    console.log(`Buscando produtos com termo: "${termo}" e categoria: ${categoria || 'todas'}`);
    return of(this.mockProdutos);
  }

  buscarCategorias(): Observable<any> {
    // Retorna as categorias mockadas em vez de chamar a API
    console.log('Buscando categorias disponíveis');
    return of(this.mockCategorias);
>>>>>>> origin/main
  }
}
