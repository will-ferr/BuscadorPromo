import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';
import { AutenticaçãoService } from '../../services/autenticação.service';
import { catchError, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  produtos: ItemCarrinho[] = [];
  total: number = 0;
  mensagemErro: string = '';
  carregando: boolean = true;

  constructor(
    private carrinhoService: CarrinhoService,
    private autenticacaoService: AutenticaçãoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.autenticacaoService.getUsuarioLogado()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/carrinho' } });
      return;
    }
    this.atualizarCarrinho();
  }

  atualizarCarrinho(): void {
    this.carregando = true;
    this.mensagemErro = '';
    
    try {
      this.produtos = this.carrinhoService.getCarrinho();
      this.total = this.carrinhoService.getTotal();
    } catch (error) {
      this.mensagemErro = 'Erro ao carregar o carrinho. Tente novamente mais tarde.';
      console.error(error);
    } finally {
      this.carregando = false;
    }
  }

  removerProduto(produtoId: string): void {
    this.carrinhoService.removerProduto(produtoId).subscribe({
      next: () => {
        this.atualizarCarrinho();
      },
      error: (error) => {
        this.mensagemErro = 'Erro ao remover o item do carrinho.';
        console.error(error);
      }
    });
  }

  atualizarQuantidade(item: ItemCarrinho, delta: number): void {
    const novaQuantidade = item.quantidade + delta;
    if (novaQuantidade < 1) return;

    const itemAtualizado = { ...item, quantidade: novaQuantidade };
    
    this.carrinhoService.atualizarItemCarrinho(itemAtualizado).subscribe({
      next: () => {
        this.atualizarCarrinho();
      },
      error: (error) => {
        this.mensagemErro = 'Erro ao atualizar a quantidade do item.';
        console.error(error);
      }
    });
  }

  finalizarCompra(): void {
    if (!this.autenticacaoService.getUsuarioLogado()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/carrinho' } });
      return;
    }

    // Aqui você pode implementar a lógica de finalização de compra
    // Por exemplo, redirecionar para uma página de checkout
    this.router.navigate(['/checkout']);
  }

  limparCarrinho(): void {
    if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
      this.carrinhoService.limparCarrinho().subscribe({
        next: () => {
          this.atualizarCarrinho();
        },
        error: (error: HttpErrorResponse) => {
          this.mensagemErro = 'Erro ao limpar o carrinho.';
          console.error(error);
        }
      });
    }
  }

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }
}
