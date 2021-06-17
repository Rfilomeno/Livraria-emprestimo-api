import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
@Table
export class Emprestimo extends Model {
  @Expose()
  @ApiProperty({ example: '1', description: 'Identificador do emprestimo' })
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'ISBN 978-8576082675',
    description: 'Código ISBN do livro emprestado',
  })
  @Expose()
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  codigoLivro: string;

  @ApiProperty({
    example: 'Código Limpo',
    description: 'Nome do livro emprestado',
  })
  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nomeLivro: string;

  @ApiProperty({
    example: 'Rodrigo Filomeno',
    description: 'Nome do usuário que pegou o emprestimo',
  })
  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nomeUsuario: string;

  @ApiProperty({
    example: '1',
    description: 'id do usuário que pegou o emprestimo',
  })
  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  idUsuario: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'cpf do usuário que pegou o emprestimo',
  })
  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cpfUsuario: string;
}
