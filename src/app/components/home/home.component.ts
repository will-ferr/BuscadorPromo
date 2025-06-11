import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
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
=======
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MercadoLivreService, Produto } from '../../services/mercado-livre.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = [];
  termoBusca = new FormControl('');
  categorias: any[] = [];
  categoriaSelecionada?: string;
  promocoes: Produto[] = [
    {
      id: '1',
      title: 'Smartphone Galaxy S23 Ultra',
      price: {
        currency_id: 'BRL',
        amount: 6999.99,
        decimals: 2
      },
      thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=500&auto=format&fit=crop',
      discount: 30,
      originalPrice: 9999.99,
      available_quantity: 100
    },
    {
      id: '2',
      title: 'Notebook Dell Inspiron 15',
      price: {
        currency_id: 'BRL',
        amount: 3999.99,
        decimals: 2
      },
      thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500&auto=format&fit=crop',
      discount: 25,
      originalPrice: 5399.99,
      available_quantity: 50
    },
    {
      id: '3',
      title: 'Smart TV 55\" LG OLED',
      price: {
        currency_id: 'BRL',
        amount: 7999.99,
        decimals: 2
      },
      thumbnail: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=500&auto=format&fit=crop',
      discount: 35,
      originalPrice: 12499.99,
      available_quantity: 30
    },
    {
      id: '4',
      title: 'Fone de Ouvido Bluetooth Sony',
      price: {
        currency_id: 'BRL',
        amount: 799.99,
        decimals: 2
      },
      thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=500&auto=format&fit=crop',
      discount: 40,
      originalPrice: 1399.99,
      available_quantity: 200
    },
    {
      id: '5',
      title: 'Tênis Esportivo Branco Premium',
      price: {
        currency_id: 'BRL',
        amount: 499.99,
        decimals: 2
      },
      thumbnail: 'https://cdn.pixabay.com/photo/2016/11/19/18/06/feet-1840619_1280.jpg',
      discount: 25,
      originalPrice: 699.99,
      available_quantity: 45
    },
    {
      id: '8',
      title: 'Smartwatch Apple Watch Series 8',
      price: {
        currency_id: 'BRL',
        amount: 2799.99,
        decimals: 2
      },
      thumbnail: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=500&auto=format&fit=crop',
      discount: 15,
      originalPrice: 3299.99,
      available_quantity: 35
    }
  ];

  constructor(
    private router: Router,
    private mercadoLivreService: MercadoLivreService
  ) { }

  ngOnInit(): void {
    this.buscarCategorias();
    this.buscarProdutos();
  }

  buscarCategorias(): void {
    this.mercadoLivreService.buscarCategorias().subscribe({
      next: (categorias: any[]) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Erro ao buscar categorias:', error);
>>>>>>> origin/main
      }
    });
  }

  buscarProdutos(): void {
<<<<<<< HEAD
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
=======
    const termo = this.termoBusca.value || '';
    const categoria = this.categoriaSelecionada;
    this.mercadoLivreService.buscarProdutos(termo, categoria).subscribe({
      next: (produtos: Produto[]) => {
        this.produtos = produtos;
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    // Implementar a lógica do carrinho
    console.log('Adicionando ao carrinho:', produto);
  }
>>>>>>> origin/main
}
