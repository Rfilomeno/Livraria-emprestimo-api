import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IEmprestimosService } from '../Interfaces/emprestimos.service.interface';
import { EmprestimoDto } from '../Models/dto/emprestimos.dto';
import { Emprestimo } from '../Models/emprestimo.model';

@ApiTags('Emprestimos')
@Controller('emprestimos')
@UseInterceptors(ClassSerializerInterceptor)
export class EmprestimosController {
  constructor(
    @Inject('IEmprestimosService')
    private emprestimosService: IEmprestimosService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retorna todos os empréstimos',
    type: [EmprestimoDto],
  })
  async getAll(): Promise<EmprestimoDto[]> {
    return this.emprestimosService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retorna o Emprestimo encontrado pelo id',
    type: EmprestimoDto,
  })
  async getById(@Param() params): Promise<EmprestimoDto> {
    return this.emprestimosService.getById(params.id);
  }

  @Get(':cpf')
  @ApiResponse({
    status: 200,
    description: 'Retorna todos os Emprestimos encontrados pelo cpf do usuario',
    type: EmprestimoDto,
  })
  async getByUser(@Param() params): Promise<EmprestimoDto[]> {
    return this.emprestimosService.getByUser(params.cpf);
  }

  @Post() //TODO: Não será endpoint, emprestimos serão criados a partir de mensagem do outro serviço
  @ApiResponse({
    status: 201,
    description: 'Cria/cadastra um emprestimo',
    type: EmprestimoDto,
  })
  async create(@Body() emprestimo: EmprestimoDto) {
    return this.emprestimosService.create(emprestimo);
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Atualiza dados de um emprestimo',
    type: EmprestimoDto,
  })
  async update(
    @Body() emprestimo: Emprestimo,
  ): Promise<[number, EmprestimoDto[]]> {
    return this.emprestimosService.update(emprestimo.id, emprestimo);
  }
  //todo pesquisar httpcode
  @ApiNoContentResponse({ status: 200, description: 'Apaga um emprestimo' })
  @Delete(':id')
  async delete(@Param() params) {
    this.emprestimosService.delete(params.id);
  }
}
