import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cryptoActions } from "../app/cryptoSlice";
import axios from "axios";
import { Asset } from "../model/Asset";
import { useAppDispatch } from "../app/hooks";
import { DailyOHLCV } from "../model/DailyOHLCV";

const cryptoApiHeaders = {
  "Content-Type": "application/json",
};

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });
//baseUrl: process.env.CRYPTO_COMPARE_URI

export const cryptocompareApi = createApi({
  reducerPath: "cryptocompareApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_CRYPTO_COMPARE_URI,
  }),
  endpoints: (builder) => ({
    getDailyOHLCV: builder.query<DailyOHLCV, string>({
      query: (symbol) =>
        //createRequest(`/v2/histoday?fsym=${symbol}&tsym=USD&limit=180`),
        createRequest(`v2/histoday?fsym=${symbol}&tsym=USD&limit=180`),
    }),
    getStats: builder.query({
      query: (symbol) =>
        createRequest(`/pricemultifull?fsyms=${symbol}&tsyms=USD`),
    }),
    getTradingSignals: builder.query({
      query: (symbol) =>
        createRequest(`/tradingsignals/intotheblock/latest?fsym=${symbol}`),
    }),
    getNews: builder.query({
      query: () => createRequest("/v2/news/?lang=EN"),
    }),
    getNewsA: builder.query({
      query: () => "/v2/news/?lang=EN",
    }),
  }),
});

export const {
  useGetDailyOHLCVQuery,
  useGetStatsQuery,
  useGetTradingSignalsQuery,
  useGetNewsQuery,
} = cryptocompareApi;

export const SearchAsset = (
  symbol: string,
  name: string,
  id: string,
  img: string
) => {
  return (dispatch: any) => {
    dispatch(
      cryptoActions.searchAsset({
        symbol,
        name,
        id,
        img,
      })
    );
  };
};

export const GetDailyOHLCV = (
  period: string,
  symbol: string,
  history = "histoday"
) => {
  return (dispatch: any) => {
    axios
      .get<DailyOHLCV>(
        `${process.env.REACT_APP_CRYPTO_COMPARE_URI}/v2/${history}?fsym=${symbol}&tsym=USD&limit=${period}`
      )
      .then(function (response) {
        dispatch(cryptoActions.getDailyOHLCV(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const GetAsset = (symbol: string) => {
  return (dispatch: any) => {
    axios
      .get<Asset>(`https://api.coincap.io/v2/assets/${symbol}`)
      .then(function (response) {
        dispatch(cryptoActions.getAsset(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// export const GetTopAssets = () => {
//   return (dispatch: any) => {
//     axios
//       .get<Assets>("https://api.coincap.io/v2/assets")
//       .then(function (response) {
//         dispatch(cryptoActions.getTopAssets(response.data));
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };
// };

export const StreamQuote = (symbol: string) => {
  return (dispatch: any) => {
    const ws = new WebSocket(
      "wss://streamer.cryptocompare.com/v2?api_key=ccbc60e710ebb553e816df9fbf194f518daf67fac0a6f2d13eaaa014737099e7"
    );
    ws.onopen = function onStreamOpen() {
      var subRequest = {
        action: "SubAdd",
        subs: [`0~Coinbase~${symbol}~USD`],
      };
      ws.send(JSON.stringify(subRequest));
    };

    ws.onmessage = function onStreamMessage(msg) {
      const data = JSON.stringify(msg.data);

      //console.log(data);
      dispatch(cryptoActions.streamQuote(data));
    };
  };
};

export const StreamPrice = (symbol: string) => {
  const dispacth = useAppDispatch();
  const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${symbol}`);
  ws.onmessage = function onStreamMessage(msg) {
    const data = JSON.parse(msg.data);
    dispacth(cryptoActions.streamPrice(data[symbol]));
  };
};

export const StreamPrices = () => {
  const dispacth = useAppDispatch();
  const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");
  ws.onmessage = function onStreamMessage(msg) {
    const data = JSON.parse(msg.data);
    dispacth(cryptoActions.streamPrices(data));
  };
};

export const StreamTopPrices = (...symbols: string[]) => {
  return (dispatch: any) => {
    const ws = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${symbols.join()}`
    );
    ws.onmessage = function onStreamMessage(msg) {
      const data = JSON.parse(msg.data);
      dispatch(cryptoActions.streamTopPrices(data));
    };
  };
};
