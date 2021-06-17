import { PickType } from '@nestjs/swagger';
import { EmprestimoDto } from './emprestimos.dto';

export class UpdateEmprestimoDto extends PickType(EmprestimoDto, [
  'codigoLivro',
  'nomeLivro',
  'nomeUsuario',
  'idUsuario',
  'cpfUsuario',
] as const) {}
