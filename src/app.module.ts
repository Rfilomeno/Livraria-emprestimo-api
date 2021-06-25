import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Emprestimo } from './Models/emprestimo.model';
import { EmprestimosController } from './Controllers/emprestimos.controller';
import { EmprestimosService } from './Services/emprestimos.service';
import { SubscriberController } from './Subscriber/subscriber.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env'],
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'livraria',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([Emprestimo]),
  ],
  controllers: [EmprestimosController, SubscriberController],
  providers: [
    EmprestimosService,
    EmprestimosController,
    {
      provide: 'IEmprestimosService',
      useClass: EmprestimosService,
    },
    {
      provide: 'EVENT_HUB',
      useValue: ClientProxyFactory.create({
        transport: Transport.TCP,
      }),
    },
  ],
})
export class AppModule {}
