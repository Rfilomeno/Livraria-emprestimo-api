import { CreateEmprestimoDto } from '../Models/dto/create-emprestimo.dto';
import { EmprestimoDto } from '../Models/dto/emprestimos.dto';
import { UpdateEmprestimoDto } from '../Models/dto/update-emprestimos.dto';

export interface IEmprestimosService {
  getAll(): Promise<EmprestimoDto[]>;
  getById(id: string): Promise<EmprestimoDto>;
  getByUser(cpf: string);
  create(emprestimo: CreateEmprestimoDto): Promise<EmprestimoDto>;
  update(
    id: string,
    emprestimo: UpdateEmprestimoDto,
  ): Promise<[number, EmprestimoDto[]]>;
  delete(id: number);
}
