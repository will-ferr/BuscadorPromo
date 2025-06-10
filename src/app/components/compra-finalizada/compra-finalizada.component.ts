import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ItemPedido {
  produto: {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
  };
  quantidade: number;
}

interface EnderecoEntrega {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  pagamento: string;
}

interface DadosPedido {
  sucesso: boolean;
  numeroPedido: string;
  itens: ItemPedido[];
  total: number;
  endereco: EnderecoEntrega;
  data: Date;
}

@Component({
  selector: 'app-compra-finalizada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compra-finalizada.component.html',
  styleUrls: ['./compra-finalizada.component.css']
})
export class CompraFinalizadaComponent implements OnInit {
  pedido: DadosPedido | null = null;
  carregando: boolean = true;
  erro: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as DadosPedido;
    
    if (state) {
      this.pedido = {
        ...state,
        data: new Date()
      };
      this.carregando = false;
    } else {
      this.erro = 'Não foi possível carregar os detalhes do pedido.';
      this.carregando = false;
    }
  }

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }

  formatarMetodoPagamento(metodo: string): string {
    switch (metodo) {
      case 'credito': return 'Cartão de Crédito';
      case 'debito': return 'Cartão de Débito';
      case 'pix': return 'PIX';
      case 'boleto': return 'Boleto Bancário';
      default: return metodo;
    }
  }
}
