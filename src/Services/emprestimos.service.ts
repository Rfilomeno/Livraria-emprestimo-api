import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IEmprestimosService } from '../Interfaces/emprestimos.service.interface';
import { CreateEmprestimoDto } from '../Models/dto/create-emprestimo.dto';
import { EmprestimoDto } from '../Models/dto/emprestimos.dto';
import { UpdateEmprestimoDto } from '../Models/dto/update-emprestimos.dto';
import { Emprestimo } from '../Models/emprestimo.model';

@Injectable()
export class EmprestimosService implements IEmprestimosService {
  constructor(
    @InjectModel(Emprestimo)
    private repository: typeof Emprestimo,
  ) {}

  async getAll(): Promise<EmprestimoDto[]> {
    return this.repository.findAll();
  }

  async getById(id: string): Promise<EmprestimoDto> {
    return this.repository.findByPk(id);
  }

  async getByUser(cpf: string): Promise<EmprestimoDto[]> {
    return this.repository.findAll({
      where: {
        cpfUsuario: cpf,
      },
    });
  }

  async create(emprestimo: CreateEmprestimoDto): Promise<EmprestimoDto> {
    return this.repository.create({ ...emprestimo });
  }

  async update(
    id: string,
    emprestimo: UpdateEmprestimoDto,
  ): Promise<[number, EmprestimoDto[]]> {
    return this.repository.update(
      { ...emprestimo },
      {
        where: {
          id: id,
        },
      },
    );
  }

  async delete(id: number) {
    this.repository.destroy({
      where: {
        id: id,
      },
    });
  }
}
