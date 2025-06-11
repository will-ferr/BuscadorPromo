export interface PrecoErro {
  tipo: 'preco_invalido' | 'preco_negativo' | 'preco_zero';
  mensagem: string;
}
