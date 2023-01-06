export interface ISubgraphResponse {
  pair: {
    id: string;
  };
  token0: {
    id: string;
    name: string;
  };
  token1: {
    id: string;
    name: string;
  };
}

export interface ISubgraphData {
  pairs: Array<{
    id: string;
    token0: { id: string; name: string };
    token1: { id: string; name: string };
  }>;
}
