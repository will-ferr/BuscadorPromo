import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
<<<<<<< HEAD
import { map, catchError, switchMap } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
=======
import { map } from 'rxjs/operators';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
>>>>>>> origin/main
  token: string;
}

export interface UsuarioCadastro {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticaçãoService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
<<<<<<< HEAD
  private apiUrl = 'http://localhost:3000';
=======
  private apiUrl = 'https://api-auth-exemplo.com'; // Substituir pela URL real da API
>>>>>>> origin/main

  constructor(private http: HttpClient) { }

  get usuarioAtual(): Observable<Usuario | null> {
    return this.usuarioSubject.asObservable();
  }

  login(email: string, senha: string): Observable<Usuario> {
<<<<<<< HEAD
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios/login`, { email, senha }).pipe(
      map(usuario => {
        if (usuario && usuario.email === email && usuario.senha === senha) {
          usuario.token = 'token-' + Date.now();
          this.usuarioSubject.next(usuario);
          localStorage.setItem('usuario', JSON.stringify(usuario));
          return usuario;
        }
        throw new Error('Senha incorreta');
=======
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, senha }).pipe(
      map(usuario => {
        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        return usuario;
>>>>>>> origin/main
      })
    );
  }

  cadastrar(usuario: UsuarioCadastro): Observable<Usuario> {
<<<<<<< HEAD
    // Primeiro verificar se o email já existe
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios?email=${usuario.email}`).pipe(
      map(resultados => {
        if (resultados.length > 0) {
          throw new Error('Email já cadastrado');
        }
        return resultados;
      }),
      catchError(() => {
        // Se a consulta falhar, assumimos que o email não existe
        return new Observable<Usuario[]>(subscriber => subscriber.next([]));
      })
    ).pipe(
      switchMap(() => {
        // Criptografar a senha antes de salvar
        const usuarioCriptografado = {
          ...usuario,
          senha: this.criptografarSenha(usuario.senha)
        };

        return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuarioCriptografado).pipe(
          map(novoUsuario => {
            novoUsuario.token = 'token-' + Date.now();
            this.usuarioSubject.next(novoUsuario);
            localStorage.setItem('usuario', JSON.stringify(novoUsuario));
            return novoUsuario;
          })
        );
=======
    return this.http.post<Usuario>(`${this.apiUrl}/cadastro`, usuario).pipe(
      map(usuario => {
        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        return usuario;
>>>>>>> origin/main
      })
    );
  }

<<<<<<< HEAD
  private criptografarSenha(senha: string): string {
    // Simples criptografia para demonstração - em produção use uma biblioteca de criptografia
    return btoa(senha + 'salt-' + Date.now());
  }

  private descriptografarSenha(senhaCriptografada: string): string {
    // Descriptografia simples para demonstração
    return atob(senhaCriptografada).split('salt-')[0];
  }

=======
>>>>>>> origin/main
  logout(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
  }

  verificarAutenticacao(): boolean {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
<<<<<<< HEAD
      const usuarioObj = JSON.parse(usuario);
      this.usuarioSubject.next(usuarioObj);
=======
      this.usuarioSubject.next(JSON.parse(usuario));
>>>>>>> origin/main
      return true;
    }
    return false;
  }
<<<<<<< HEAD

  getUsuarioLogado(): Usuario | null {
    return this.usuarioSubject.value;
  }
=======
>>>>>>> origin/main
}
