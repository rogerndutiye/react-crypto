export interface SVGIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface Asset {
  symbol: string;
  name: string;
}

export type Sentiment = "bullish" | "bearish";

export interface TradingSignals {
  id: number;
  partner_symbol: string;
  symbol: string;
  time: number;
  largetxsVar: Signal;
  addressesNetGrowth: Signal;
  concentrationVar: Signal;
  inOutVar: Signal;
}

export interface Signal {
  category: string;
  score: number;
  score_threshold_bearish: number;
  score_threshold_bullish: number;
  sentiment: Sentiment;
  value: number;
}
export interface CoinList {
  [x: string]: any;
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description: string;
  color: null | string;
  iconType: IconType;
  iconUrl: string;
  websiteUrl: null | string;
  socials: Link[];
  links: Link[];
  confirmedSupply: boolean;
  numberOfMarkets: number;
  numberOfExchanges: number;
  type: Type;
  volume: number;
  marketCap: number;
  price: string;
  circulatingSupply: number;
  totalSupply: number;
  approvedSupply: boolean;
  firstSeen: number;
  listedAt: number;
  change: number;
  rank: number;
  history: string[];
  allTimeHigh: AllTimeHigh;
  penalty: boolean;
}

export interface AllTimeHigh {
  price: string;
  timestamp: number;
}

export enum IconType {
  Pixel = "pixel",
  Vector = "vector",
}

export interface Link {
  name: string;
  type: string;
  url: string;
}

export enum Type {
  Coin = "coin",
}
