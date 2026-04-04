import { Module } from '@nestjs/common';
import * as path from 'path';
import { NestCordShardingModule } from '../../../packages/sharding/src';
import { ManagerListener } from './manager.listener';

@Module({
  imports: [
    NestCordShardingModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      file: path.join(__dirname, 'shard.js'),
      totalShards: 'auto',
      spawnOptions: {
        amount: 'auto',
        delay: 5500,
        timeout: 30000,
      },
    }),
  ],
  providers: [ManagerListener],
})
export class ManagerModule {}
