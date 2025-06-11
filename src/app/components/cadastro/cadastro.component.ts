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
<<<<<<< HEAD
    if (this.nome.trim() === '') {
      this.mensagemErro = 'Nome é obrigatório';
      return;
    }
    if (this.email.trim() === '') {
      this.mensagemErro = 'Email é obrigatório';
      return;
    }
    if (!this.email.includes('@')) {
      this.mensagemErro = 'Email inválido';
      return;
    }
    if (this.senha.length < 6) {
      this.mensagemErro = 'Senha deve ter pelo menos 6 caracteres';
      return;
    }
=======
>>>>>>> origin/main
    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem';
      return;
    }

    const usuario: UsuarioCadastro = {
<<<<<<< HEAD
      nome: this.nome.trim(),
      email: this.email.trim(),
=======
      nome: this.nome,
      email: this.email,
>>>>>>> origin/main
      senha: this.senha
    };

    this.autenticacaoService.cadastrar(usuario)
      .subscribe(
<<<<<<< HEAD
        (usuario) => {
          this.mensagemErro = '';
          this.router.navigate(['/login'], {
            queryParams: {
              cadastrado: true
            }
          });
        },
        (error: any) => {
          this.mensagemErro = error.error || 'Erro ao cadastrar usuário';
          if (error.error === 'Email já cadastrado') {
            this.mensagemErro = 'Este email já está cadastrado';
          }
=======
        () => {
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.mensagemErro = 'Erro ao cadastrar usuário';
>>>>>>> origin/main
        }
      );
  }

  voltarParaLogin(): void {
    this.router.navigate(['/login']);
  }
}
