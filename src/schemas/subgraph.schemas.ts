import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PairsDocument = HydratedDocument<Pairs>;

@Schema()
export class Pairs {
  @Prop({ type: 'Object' })
  pair: {
    id: string;
  };

  @Prop({ type: 'Object' })
  token0: {
    id: string;
    name: string;
  };

  @Prop({ type: 'Object' })
  token1: {
    id: string;
    name: string;
  };
}

export const PairSchema = SchemaFactory.createForClass(Pairs);
