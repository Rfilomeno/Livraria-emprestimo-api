import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 3000,
      url: 'nats://localhost:4222',
    },
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Livraria-Emprestimos')
    .setDescription('Livraria Emprestimos API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
