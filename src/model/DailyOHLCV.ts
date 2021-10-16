export interface DailyOHLCV {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: RateLimit;
  Data: Data;
}

export interface Data {
  Aggregated: boolean;
  TimeFrom: number;
  TimeTo: number;
  Data: Datum[];
}

export interface Datum {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number;
  conversionType: ConversionType;
  conversionSymbol: string;
}

export enum ConversionType {
  Direct = "direct",
}

export interface RateLimit {}
