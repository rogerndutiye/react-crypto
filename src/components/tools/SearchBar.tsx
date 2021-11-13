import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CoinLists } from "../../model/type";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { cryptoActions } from "../../app/cryptoSlice";

import FilteredSearch from "./FilteredSearch";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [find, setFind] = useState([]);
  const { data } = useGetCryptosQuery(100);
  const coins: CoinLists = data?.data;

  // console.log(coins);

  const { assets, isLoading } = useAppSelector((state) => state.crypto);
  useEffect(() => {
    if (coins) {
      dispatch(cryptoActions.getTopAssets(coins));
    }
  }, [coins, dispatch, isLoading]);

  // eslint-disable-next-line
  useEffect(() => {}, [find.length <= 0]);

  const handleOnChange = (e: any) => {
    let filteredAssets = assets.filter((asset: any) =>
      asset.name.toLowerCase().match(new RegExp(e.target.value, "gi"))
    );
    if (e.target.value) {
      setFind(filteredAssets);
      return;
    }
    setFind([]);
  };

  return (
    <>
      <svg
        className="absolute fill-current h-4 hidden left-0 ml-4 pointer-events-none text-gray-500 w-4 group-hover:text-gray-400 sm:block"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        style={
          find.length > 0
            ? { color: "white", transform: "scale(1.02)", animation: "500ms" }
            : {}
        }
      >
        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
      </svg>

      <input
        onChange={handleOnChange}
        name="search"
        autoComplete="off"
        className="bg-gray-800 block leading-normal pl-10 py-1.5 pr-4 ring-opacity-90 rounded-2xl text-gray-400 w-full focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="search crypto currency..."
      />

      {find.length > 0 && <FilteredSearch search={find} setFind={setFind} />}
    </>
  );
}
