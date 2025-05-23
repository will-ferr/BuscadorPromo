import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { Produto } from '../../services/mercado-livre.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  produtos: Produto[] = [];
  total: number = 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atualizarCarrinho();
  }

  atualizarCarrinho(): void {
    this.produtos = this.carrinhoService.getCarrinho();
    this.total = this.carrinhoService.getTotal();
  }

  removerProduto(produtoId: string): void {
    this.carrinhoService.removerProduto(produtoId);
    this.atualizarCarrinho();
  }

  limparCarrinho(): void {
    this.carrinhoService.limparCarrinho();
    this.atualizarCarrinho();
  }

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }
}
