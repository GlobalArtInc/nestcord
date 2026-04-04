import { NestFactory } from '@nestjs/core';
import { ShardModule } from './shard.module';

async function bootstrap() {
  const app = await NestFactory.create(ShardModule);
  await app.listen(0);
}
bootstrap();
