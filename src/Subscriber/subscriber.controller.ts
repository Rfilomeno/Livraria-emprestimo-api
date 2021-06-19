import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateEmprestimoDto } from '../Models/dto/create-emprestimo.dto';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_HUB } from '../nats.type';
import { IEmprestimosService } from 'src/Interfaces/emprestimos.service.interface';

@Controller()
export class SubscriberController {
  constructor(
    @Inject(EVENT_HUB) private readonly client: ClientProxy,
    @Inject('IEmprestimosService')
    private emprestimosService: IEmprestimosService,
  ) {}

  async onModuleInit(): Promise<void> {
    return this.client.connect();
  }

  onModuleDestroy(): void {
    return this.client.close();
  }

  @EventPattern('create_emprestimo')
  async handleCreate(data: CreateEmprestimoDto) {
    // console.log(JSON.stringify(data));
    this.emprestimosService.create(data);
  }
}
