import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Produto {
  id: string;
  title: string;
  price: {
    currency_id: string;
    amount: number;
    decimals: number;
  };
  thumbnail: string;
  discount?: number;
  originalPrice?: number;
  available_quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class MercadoLivreService {
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
  }
}
