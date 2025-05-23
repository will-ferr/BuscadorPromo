import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
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
  private apiUrl = 'https://api-auth-exemplo.com'; // Substituir pela URL real da API

  constructor(private http: HttpClient) { }

  get usuarioAtual(): Observable<Usuario | null> {
    return this.usuarioSubject.asObservable();
  }

  login(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, { email, senha }).pipe(
      map(usuario => {
        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        return usuario;
      })
    );
  }

  cadastrar(usuario: UsuarioCadastro): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/cadastro`, usuario).pipe(
      map(usuario => {
        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        return usuario;
      })
    );
  }

  logout(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
  }

  verificarAutenticacao(): boolean {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioSubject.next(JSON.parse(usuario));
      return true;
    }
    return false;
  }
}
