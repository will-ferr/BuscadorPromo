import { Component, OnInit } from '@angular/core';
import { AutenticaService } from '../../services/autentica.service';
import { Produto, Paginacao } from '../../services/mercado-livre.service';
import { PaginacaoComponent } from '../paginacao/paginacao.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ProdutoCardComponent } from '../produto-card/produto-card.component';
import { MercadoLivreService } from '../../services/mercado-livre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProdutoCardComponent,
    PaginacaoComponent
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  form = new FormGroup({
    termoBusca: new FormControl(''),
    categoria: new FormControl('')
  });
  categorias: any[] = [];
  produtos: Produto[] = [];
  sugestoes: Produto[] = [];
  paginacao: Paginacao = {
    paginaAtual: 1,
    totalPaginas: 1,
    produtos: []
  };
  loading = false;
  loadingSugestoes = false;

  constructor(
    private mercadoLivreService: MercadoLivreService,
    private autenticaService: AutenticaService
  ) {}

  ordenarPor(campo: 'preco' | 'relevancia'): void {
    if (campo === 'preco') {
      this.produtos.sort((a, b) => a.price - b.price);
    } else {
      // Ordenação por relevância mantém a ordem original
      this.buscarProdutos();
    }
  }

  ngOnInit(): void {
    this.buscarCategorias();
    this.buscarSugestoes();
  }

  buscarCategorias(): void {
    this.loading = true;
    this.mercadoLivreService.buscarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar categorias:', error);
        this.loading = false;
      }
    });
  }

  buscarProdutos(): void {
    const termo = this.form.get('termoBusca')?.value || '';
    const categoria = this.form.get('categoria')?.value || '';
    if (!termo) {
      return;
    }

    this.loading = true;
    this.mercadoLivreService.buscarProdutos(termo, categoria)
      .subscribe({
        next: (paginacao) => {
          this.produtos = paginacao.produtos;
          this.paginacao = paginacao;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.error('Erro ao buscar produtos:', error);
          this.produtos = [];
          this.paginacao = {
            paginaAtual: 1,
            totalPaginas: 0,
            produtos: []
          };
        }
      });
  }

  buscarSugestoes(): void {
    this.loadingSugestoes = true;
    this.mercadoLivreService.buscarSugestoes()
      .subscribe({
        next: (response) => {
          this.sugestoes = response.results;
          this.loadingSugestoes = false;
        },
        error: (error) => {
          this.loadingSugestoes = false;
          console.error('Erro ao buscar sugestões:', error);
          this.sugestoes = [];
        }
      });
  }

  mudarPagina(pagina: number): void {
    this.paginacao.paginaAtual = pagina;
    this.buscarProdutos();
  }

  adicionarAoCarrinho(produto: Produto): void {
    this.autenticaService.adicionarAoCarrinho(produto).subscribe({
      next: () => {
        console.log('Produto adicionado ao carrinho:', produto);
      },
      error: (error) => {
        console.error('Erro ao adicionar ao carrinho:', error);
      }
    });
  }
}
