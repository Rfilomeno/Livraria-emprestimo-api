import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimoDto } from '../Models/dto/emprestimos.dto';
import { MockEmprestimosService } from './mock.emprestimos.service';
import { SubscriberController } from '../Subscriber/subscriber.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

describe('EmprestimoController', () => {
  let subscriberController: SubscriberController;
  let emprestimosService: MockEmprestimosService;
  const emprestimo: EmprestimoDto = {
    id: '1',
    codigoLivro: 'ISBN 978-8576082675',
    nomeLivro: 'Código limpo',
    nomeUsuario: 'Rodrigo Filomeno',
    idUsuario: '1',
    cpfUsuario: '123.456.789-00',
  };
  const result = new Promise<EmprestimoDto>((resolve, reject) => {
    resolve(emprestimo);
    reject();
  });
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SubscriberController],
      providers: [
        {
          provide: 'IEmprestimosService',
          useClass: MockEmprestimosService,
        },
        {
          provide: 'EVENT_HUB',
          useValue: ClientProxyFactory.create({
            transport: Transport.TCP,
          }),
        },
        MockEmprestimosService,
      ],
    }).compile();

    subscriberController = app.get<SubscriberController>(SubscriberController);
    emprestimosService = app.get<MockEmprestimosService>(
      MockEmprestimosService,
    );
  });

  describe('EmprestimosController', () => {
    it('should create emprestimo', async () => {
      jest.spyOn(emprestimosService, 'create').mockImplementation(() => result);
      expect(subscriberController.handleCreate(emprestimo)).toStrictEqual(
        result,
      );
    });
  });
});
