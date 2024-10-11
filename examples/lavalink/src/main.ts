import { NestFactory } from '@nestjs/core';
import { LevalinkExampleModule } from './levalink-example.module';

async function bootstrap() {
  const app = await NestFactory.create(LevalinkExampleModule);
  await app.listen(2400);
}
bootstrap();
