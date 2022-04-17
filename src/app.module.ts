import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedsModule } from './feeds/feeds.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), FeedsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
