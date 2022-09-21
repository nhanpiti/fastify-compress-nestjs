import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './app.module';
import * as FastifyCompress from '@fastify/compress';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true
    }
  );

  await app.register(FastifyCompress as any, { encodings: ['gzip', 'deflate'], global: true });

  const config = new DocumentBuilder()
    .setTitle('Swagger')
    .setDescription('API Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger-api', app, document);

  await app.listen(3000);
}
bootstrap();
