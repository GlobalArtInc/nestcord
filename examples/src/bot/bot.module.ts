import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";

@Module({
  providers: [BotService],
})
export class BotModule {}