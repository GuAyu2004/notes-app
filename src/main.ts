import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Serve static files from the "public" folder
  app.use(express.static(join(__dirname, '..', 'front')));

  app.enableCors(); // Allow frontend requests
  await app.listen(3000);
}
bootstrap();
