import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../../services/carrinho.service';
import { AutenticaçãoService } from '../../services/autenticação.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  itens: ItemCarrinho[] = [];
  total: number = 0;
  carregando: boolean = true;
  mensagemErro: string = '';
  finalizando: boolean = false;
  
  // Dados do formulário
  endereco = {
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    pagamento: 'credito' as 'credito' | 'debito' | 'pix' | 'boleto'
  };

  constructor(
    private carrinhoService: CarrinhoService,
    private autenticacaoService: AutenticaçãoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.autenticacaoService.getUsuarioLogado()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/checkout' } });
      return;
    }
    this.carregarCarrinho();
  }

  carregarCarrinho(): void {
    this.carregando = true;
    this.mensagemErro = '';
    
    try {
      this.itens = this.carrinhoService.getCarrinho();
      this.total = this.carrinhoService.getTotal();
      
      if (this.itens.length === 0) {
        this.router.navigate(['/carrinho']);
        return;
      }
    } catch (error) {
      this.mensagemErro = 'Erro ao carregar o carrinho. Tente novamente mais tarde.';
      console.error(error);
    } finally {
      this.carregando = false;
    }
  }

  finalizarCompra(): void {
    if (this.finalizando) return;
    
    // Validação básica do formulário
    if (!this.endereco.cep || !this.endereco.rua || !this.endereco.numero || 
        !this.endereco.bairro || !this.endereco.cidade || !this.endereco.estado) {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }
    
    this.finalizando = true;
    this.mensagemErro = '';
    
    // Simulando uma requisição para finalizar a compra
    setTimeout(() => {
      try {
        // Aqui você implementaria a lógica real de finalização de compra
        // Por exemplo, enviar os dados para o servidor e processar o pagamento
        
        // Limpar o carrinho após a finalização
        this.carrinhoService.limparCarrinho().subscribe({
          next: () => {
            // Redirecionar para a página de confirmação
            this.router.navigate(['/compra-finalizada'], {
              state: { 
                sucesso: true,
                numeroPedido: 'PED' + Date.now(),
                itens: this.itens,
                total: this.total,
                endereco: this.endereco
              }
            });
          },
          error: (error) => {
            console.error('Erro ao limpar carrinho:', error);
            this.mensagemErro = 'Erro ao finalizar a compra. Por favor, tente novamente.';
            this.finalizando = false;
          }
        });
      } catch (error) {
        console.error('Erro ao finalizar compra:', error);
        this.mensagemErro = 'Ocorreu um erro ao processar sua compra. Por favor, tente novamente.';
        this.finalizando = false;
      }
    }, 1500);
  }

  voltarParaCarrinho(): void {
    this.router.navigate(['/carrinho']);
  }

  buscarCep(cep: string): void {
    // Implementação básica de busca de CEP
    if (cep.length === 8) {
      // Aqui você implementaria a busca do CEP em um serviço de CEP
      // Por enquanto, apenas simulamos um endereço
      setTimeout(() => {
        this.endereco.rua = 'Rua Exemplo';
        this.endereco.bairro = 'Bairro Exemplo';
        this.endereco.cidade = 'Cidade Exemplo';
        this.endereco.estado = 'SP';
      }, 500);
    }
  }
}
