import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ApolloClientService } from './services/subgraph.services';
import { TasksService } from './services/cronjob.services';
import { Pairs, PairSchema } from './schemas/subgraph.schemas';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: 'Pairs', schema: PairSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService, ApolloClientService, TasksService],
})
export class AppModule {}
