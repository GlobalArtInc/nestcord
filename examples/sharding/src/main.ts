import { NestFactory } from '@nestjs/core';
import { ManagerModule } from './manager.module';
import { ShutdownSignal } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ManagerModule);
  app.enableShutdownHooks([ShutdownSignal.SIGTERM, ShutdownSignal.SIGUSR2]);
  await app.listen(0);
}
bootstrap();
