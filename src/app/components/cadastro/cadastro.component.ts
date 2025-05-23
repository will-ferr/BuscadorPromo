import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticaçãoService, Usuario, UsuarioCadastro } from '../../services/autenticação.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mensagemErro = '';

  constructor(
    private autenticacaoService: AutenticaçãoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.autenticacaoService.verificarAutenticacao()) {
      this.router.navigate(['/']);
    }
  }

  cadastrar(): void {
    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem';
      return;
    }

    const usuario: UsuarioCadastro = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.autenticacaoService.cadastrar(usuario)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.mensagemErro = 'Erro ao cadastrar usuário';
        }
      );
  }

  voltarParaLogin(): void {
    this.router.navigate(['/login']);
  }
}
