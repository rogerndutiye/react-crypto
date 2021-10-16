import React from "react";
import { useAppSelector } from "../../app/hooks";

interface CyryptoHeaderProps {
  name: string;
  symbol: string;
  price: number;
  changePercent: number;
  priceUsd: number;
}

export default function CryptoHeader({
  name,
  symbol,
  price,
  changePercent,
  priceUsd,
}: CyryptoHeaderProps) {
  const { searchAsset } = useAppSelector((state) => state.crypto);
  const isPositive = Math.sign(changePercent);
  return (
    <div className="flex-grow bg-gray-900  text-gray-100   container mx-auto px-6 pb-8">
      <div className="hidden lg:flex">
        <div className="w-1/2 text-center py-8">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-gray-800 rounded-md p-3">
              <img
                className="w-full rounded-full overflow-hidden object-cover"
                src={searchAsset.img}
                alt={searchAsset.name}
              />
            </div>
            <div className="w-1/3 text-3xl font-extralight">
              {searchAsset.name}{" "}
            </div>
            <div className="w-1/3 text-4xl font-thin text-gray-600 text-opacity-80">
              {searchAsset.symbol}
            </div>
          </div>
        </div>
        <div className="w-1/2 text-center py-8">
          <div className="border-l border-gray-700">
            <div className="text-grey-darker mb-2">
              <span className="text-3xl align-top">
                <span className="text-green align-top"></span>$
              </span>
              <span className="text-5xl">
                {price ? Number(price).toFixed(2) : Number(priceUsd).toFixed(2)}
              </span>
              <span className="text-3xl align-top">
                <strong
                  className={
                    isPositive === 1 ? "text-green-400" : "text-red-400"
                  }
                >
                  {isPositive === 1 ? "+" : ""}
                  {Number(changePercent).toFixed(2)}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
