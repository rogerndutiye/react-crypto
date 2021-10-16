export interface Asset {
  data: AssetData;
  timestamp: number;
}

export interface Assets {
  data: { [key: string]: null | string }[];
  timestamp: number;
}

export interface AssetData {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}
