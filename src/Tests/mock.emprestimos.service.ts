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
  private noWarnings = 'All good!';
  private result = new Promise<EmprestimoDto>((resolve, reject) => {
    resolve(this.emprestimo);
    reject();
  });
  private resultArray = new Promise<EmprestimoDto[]>((resolve, reject) => {
    resolve([this.emprestimo]);
    reject();
  });

  create(emprestimo: CreateEmprestimoDto): Promise<EmprestimoDto> {
    this.noWarnings = JSON.stringify(emprestimo);
    return this.result;
  }
  getAll(): Promise<EmprestimoDto[]> {
    return this.resultArray;
  }

  getById(id: string): Promise<EmprestimoDto> {
    this.noWarnings = JSON.stringify(id);
    return this.result;
  }

  getByUser(cpf: string): Promise<EmprestimoDto[]> {
    this.noWarnings = JSON.stringify(cpf);
    return this.resultArray;
  }

  update(
    id: string,
    emprestimo: UpdateEmprestimoDto,
  ): Promise<[number, EmprestimoDto[]]> {
    this.noWarnings = JSON.stringify(id) + JSON.stringify(emprestimo);
    const result = new Promise<[number, EmprestimoDto[]]>((resolve, reject) => {
      resolve([1, [this.emprestimo]]);
      reject();
    });
    return result;
  }
  delete(id: number) {
    this.noWarnings = JSON.stringify(id);
    this.noWarnings = 'All good!';
    console.log(this.noWarnings);
  }
}
