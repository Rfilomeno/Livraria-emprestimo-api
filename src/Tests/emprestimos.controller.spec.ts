import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimoDto } from '../Models/dto/emprestimos.dto';
import { EmprestimosController } from '../Controllers/emprestimos.controller';
import { MockEmprestimosService } from './mock.emprestimos.service';
import { Emprestimo } from '../Models/emprestimo.model';

describe('EmprestimoController', () => {
  let emprestimosController: EmprestimosController;
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
  });
  const resultArray = new Promise<EmprestimoDto[]>((resolve, reject) => {
    resolve([emprestimo]);
  });
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [EmprestimosController],
      providers: [
        {
          provide: 'IEmprestimosService',
          useClass: MockEmprestimosService,
        },
        MockEmprestimosService,
      ],
    }).compile();

    emprestimosController = app.get<EmprestimosController>(
      EmprestimosController,
    );
    emprestimosService = app.get<MockEmprestimosService>(
      MockEmprestimosService,
    );
  });

  describe('EmprestimosController', () => {
    it('should create emprestimo', async () => {
      jest.spyOn(emprestimosService, 'create').mockImplementation(() => result);
      expect(emprestimosController.create(emprestimo)).toStrictEqual(result);
    });

    it('should return an Array of emprestimos', async () => {
      jest
        .spyOn(emprestimosService, 'getAll')
        .mockImplementation(() => resultArray);
      expect(emprestimosController.getAll()).toStrictEqual(resultArray);
    });

    it('should return a emprestimo', async () => {
      jest
        .spyOn(emprestimosService, 'getById')
        .mockImplementation(() => result);
      expect(emprestimosController.getById('1')).toStrictEqual(result);
    });

    it('should return an Array of emprestimos from the user', async () => {
      jest
        .spyOn(emprestimosService, 'getAll')
        .mockImplementation(() => resultArray);
      expect(emprestimosController.getByUser('123.456.789-00')).toStrictEqual(
        resultArray,
      );
    });

    it('should update a emprestimo', async () => {
      const resultUpdate = new Promise<[number, EmprestimoDto[]]>(
        (resolve, reject) => {
          resolve([1, [emprestimo]]);
        },
      );
      jest
        .spyOn(emprestimosService, 'update')
        .mockImplementation(() => resultUpdate);
      expect(
        emprestimosController.update(emprestimo as Emprestimo),
      ).toStrictEqual(resultUpdate);
    });
    it('should delete a emprestimo', async () => {
      const resultDelete: Promise<void> = new Promise((resolve, reject) => {
        resolve();
      });
      jest.spyOn(emprestimosService, 'delete').mockImplementation();
      expect(emprestimosController.delete('1')).toStrictEqual(resultDelete);
    });
  });
});
