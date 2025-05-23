import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticaçãoService, Usuario, UsuarioCadastro } from '../../services/autenticação.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  senha = '';
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

  fazerLogin(): void {
    this.autenticacaoService.login(this.email, this.senha)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error: any) => {
          this.mensagemErro = 'Email ou senha inválidos';
        }
      );
  }

  voltarParaHome(): void {
    this.router.navigate(['/']);
  }
}
