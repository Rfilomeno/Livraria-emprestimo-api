import { Injectable } from '@nestjs/common';
import { EmprestimoDto } from '../Models/dto/emprestimos.dto';
import { CreateEmprestimoDto } from '../Models/dto/create-emprestimo.dto';
import { UpdateEmprestimoDto } from 'src/Models/dto/update-emprestimos.dto';

@Injectable()
export class MockEmprestimosService {
  private emprestimo: EmprestimoDto = {
    id: '1',
    codigoLivro: 'ISBN 978-8576082675',
    nomeLivro: 'Código limpo',
    nomeUsuario: 'Rodrigo Filomeno',
    idUsuario: '1',
    cpfUsuario: '123.456.789-00',
  };
  private result = new Promise<EmprestimoDto>((resolve, reject) => {
    resolve(this.emprestimo);
  });
  private resultArray = new Promise<EmprestimoDto[]>((resolve, reject) => {
    resolve([this.emprestimo]);
  });

  create(emprestimo: CreateEmprestimoDto): Promise<EmprestimoDto> {
    return this.result;
  }
  getAll(): Promise<EmprestimoDto[]> {
    return this.resultArray;
  }

  getById(id: string): Promise<EmprestimoDto> {
    return this.result;
  }

  getByUser(cpf: string): Promise<EmprestimoDto[]> {
    return this.resultArray;
  }

  update(
    id: string,
    emprestimo: UpdateEmprestimoDto,
  ): Promise<[number, EmprestimoDto[]]> {
    const result = new Promise<[number, EmprestimoDto[]]>((resolve, reject) => {
      resolve([1, [this.emprestimo]]);
    });
    return result;
  }
  delete(id: number) {}
}
