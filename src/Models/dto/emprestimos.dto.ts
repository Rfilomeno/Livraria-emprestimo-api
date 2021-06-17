import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmprestimoDto {
  @IsString()
  @ApiProperty({ example: '1', description: 'Identificador do emprestimo' })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ISBN 978-8576082675',
    description: 'Código ISBN do livro emprestado',
  })
  codigoLivro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Código Limpo',
    description: 'Nome do livro emprestado',
  })
  nomeLivro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Rodrigo Filomeno',
    description: 'Nome do usuário que pegou o emprestimo',
  })
  nomeUsuario: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1',
    description: 'id do usuário que pegou o emprestimo',
  })
  idUsuario: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123.456.789-00',
    description: 'cpf do usuário que pegou o emprestimo',
  })
  cpfUsuario: string;
}
