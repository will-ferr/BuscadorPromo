import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from './mercado-livre.service';

interface CacheItem {
  data: any;
  timestamp: number;
  expires: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem>();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

  constructor() {
    // Limpa cache expirado periodicamente
    setInterval(() => this.limparCacheExpirado(), 5 * 60 * 1000); // a cada 5 minutos
  }

  private limparCacheExpirado(): void {
    const agora = Date.now();
    this.cache.forEach((item, key) => {
      if (item.expires < agora) {
        this.cache.delete(key);
      }
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const agora = Date.now();
    if (item.expires < agora) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  set(key: string, data: any): void {
    const agora = Date.now();
    this.cache.set(key, {
      data,
      timestamp: agora,
      expires: agora + this.CACHE_DURATION
    });
  }

  // Métodos específicos para produtos
  getProdutos(termo: string, categoria?: string): Produto[] | null {
    const key = this.gerarChaveCache(termo, categoria);
    return this.get<Produto[]>(key);
  }

  setProdutos(termo: string, produtos: Produto[], categoria?: string): void {
    const key = this.gerarChaveCache(termo, categoria);
    this.set(key, produtos);
  }

  private gerarChaveCache(termo: string, categoria?: string): string {
    return `produtos_${termo}_${categoria || 'todas'}`;
  }

  // Método para limpar cache específico
  limparCacheProduto(termo: string, categoria?: string): void {
    const key = this.gerarChaveCache(termo, categoria);
    this.cache.delete(key);
  }

  // Método para limpar todo o cache
  limparCache(): void {
    this.cache.clear();
  }
}
