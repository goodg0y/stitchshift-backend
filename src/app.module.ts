import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OutfitModule } from './outfit/outfit.module';

@Module({
  imports: [OutfitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
