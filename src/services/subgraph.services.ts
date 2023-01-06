import { Injectable } from '@nestjs/common';
import { ISubgraphData, ISubgraphResponse } from './dto/subgraph.dto';
import {
  gql,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from '@apollo/client/core';
import fetch from 'cross-fetch';

@Injectable()
export class ApolloClientService {
  async querySubgraph(): Promise<ISubgraphData> {
    const response = await this.InitializeApolloClient.query({
      query: gql`
        query MyQuery {
          pairs {
            id
            token0 {
              id
              name
            }
            token1 {
              id
              name
            }
          }
        }
      `,
    });

    const data: ISubgraphData = response.data;

    return data;
  }

  async mapDataToPairs(data: ISubgraphData): Promise<ISubgraphResponse[]> {
    const subgraphPairs = data?.pairs.map((pair) => {
      return {
        pair: {
          id: pair?.id,
        },
        token0: {
          id: pair?.token0?.id,
          name: pair?.token0?.name,
        },
        token1: {
          id: pair?.token1?.id,
          name: pair?.token1?.name,
        },
      };
    });
    return subgraphPairs;
  }

  get InitializeApolloClient(): ApolloClient<NormalizedCacheObject> {
    const client = new ApolloClient({
      link: new HttpLink({ uri: process.env.SUBGRAPH_QUERY_URL, fetch }),
      cache: new InMemoryCache(),
    });
    return client;
  }
}
