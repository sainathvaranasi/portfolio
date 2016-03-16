export interface Quote {
  AverageDailyVolume: any;
  Change: Number;
  DaysLow: any;
  DaysHigh: any;
  YearLow: any;
  YearHigh: any;
  MarketCapitalization: any;
  LastTradePriceOnly: any;
  DaysRange: any;
  Name: String;
  Symbol: any;
  Volume: any;
  StockExchange: any;
}

export interface QuoteSearch {
  symbol: string;
  name: string;
  exch: string;
  type: string;
}

export interface Stock {
  Name: string;
  Symbol: string;
  Quantity: number;
  Price: number;
  Change: number;
}

interface Price {
  price: number;
  change: number;
}

export interface StockPrices {
  [index: string]: Price;
}

