import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Asset } from "../model/Asset";
import { DailyOHLCV } from "../model/DailyOHLCV";
import { CoinLists } from "../model/type";

const initialState: any = {
  price: null,
  prices: {},
  topPrices: {},
  quote: {},
  asset: {},
  assets: [],
  isLoading: true,
  dailyOHLCV: [],
  searchAsset: {
    symbol: "BTC",
    name: "bitcoin",
    id: "1",
    img: "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg",
  },
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    searchAsset: (state, action) => {
      state.searchAsset = action.payload;
      state.isLoading = false;
    },
    getDailyOHLCV: (state, action: PayloadAction<DailyOHLCV>) => {
      state.dailyOHLCV = action.payload.Data.Data;
      state.isLoading = false;
    },
    getAsset: (state, action: PayloadAction<Asset>) => {
      state.asset = action.payload.data;
      state.isLoading = false;
    },
    getTopAssets: (state, action: PayloadAction<CoinLists>) => {
      state.assets = action.payload;
      state.isLoading = false;
    },

    streamQuote: (state, action) => {
      state.quote = action.payload;
      state.isLoading = false;
    },

    streamPrice: (state, action) => {
      state.price = action.payload;
      state.isLoading = false;
    },

    streamPrices: (state, action) => {
      state.prices = action.payload;
      state.isLoading = false;
    },
    streamTopPrices: (state, action) => {
      state.topPrices = action.payload;
      state.isLoading = false;
    },
  },
});

// export const {
//   addAsset,
//   addTopAssets,
//   streamQuote,
//   streamPrice,
//   streamPrices,
//   streamTopPrices,
//   searchAsset,
// } = cryptoSlice.actions;
export const getquote = (state: RootState) => state.crypto.quote;

export const cryptoActions = cryptoSlice.actions;
export default cryptoSlice.reducer;
