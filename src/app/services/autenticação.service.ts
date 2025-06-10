import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
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
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get usuarioAtual(): Observable<Usuario | null> {
    return this.usuarioSubject.asObservable();
  }

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios/login`, { email, senha }).pipe(
      map(usuario => {
        if (usuario && usuario.email === email && usuario.senha === senha) {
          usuario.token = 'token-' + Date.now();
          this.usuarioSubject.next(usuario);
          localStorage.setItem('usuario', JSON.stringify(usuario));
          return usuario;
        }
        throw new Error('Senha incorreta');
      })
    );
  }

  cadastrar(usuario: UsuarioCadastro): Observable<Usuario> {
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
      })
    );
  }

  private criptografarSenha(senha: string): string {
    // Simples criptografia para demonstração - em produção use uma biblioteca de criptografia
    return btoa(senha + 'salt-' + Date.now());
  }

  private descriptografarSenha(senhaCriptografada: string): string {
    // Descriptografia simples para demonstração
    return atob(senhaCriptografada).split('salt-')[0];
  }

  logout(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
  }

  verificarAutenticacao(): boolean {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.usuarioSubject.next(usuarioObj);
      return true;
    }
    return false;
  }

  getUsuarioLogado(): Usuario | null {
    return this.usuarioSubject.value;
  }
}
