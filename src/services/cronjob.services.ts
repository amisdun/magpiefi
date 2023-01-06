import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApolloClientService } from './subgraph.services';
import { InjectModel } from '@nestjs/mongoose';
import { PairsDocument } from 'src/schemas/subgraph.schemas';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    private readonly queryService: ApolloClientService,
    @InjectModel('Pairs') private pairModel: Model<PairsDocument>,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    const pairs = await this.queryService.querySubgraph();
    const mappedPairs = await this.queryService.mapDataToPairs(pairs);
    const bulkUpdate = mappedPairs.map((doc) => {
      return {
        updateOne: {
          filter: { 'pair.id': doc?.pair?.id },
          update: { $set: { ...doc } },
          upsert: true,
        },
      };
    });
    await this.pairModel.bulkWrite(bulkUpdate);
  }
}
