import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { GetAsset } from "../services/cryptocompareApi";
import { useAppDispatch } from "../app/hooks";
import { StreamTopPrices, GetDailyOHLCV } from "../services/cryptocompareApi";
import CryptoHeader from "../components/Crypto/CryptoHeader";
import CryptoDashboard from "../components/Crypto/CryptoDashboard";

const CryptoPage = () => {
  const dispatch = useAppDispatch();
  const { searchAsset, asset, topPrices } = useAppSelector(
    (state) => state.crypto
  );
  useEffect(() => {
    dispatch(GetAsset(searchAsset.name));
    dispatch(GetDailyOHLCV("180", searchAsset.symbol));
    dispatch(
      StreamTopPrices(
        "ethereum",
        "bitcoin",
        "monero",
        "litecoin",
        "dash",
        "basic-attention-token",
        "ripple",
        "stellar"
      )
    );
    // eslint-disable-next-line
  }, [searchAsset.name]);

  return (
    <>
      <div className="flex border-t border-gray-800">
        <div className="w-full">
          <CryptoHeader
            priceUsd={asset.priceUsd}
            price={topPrices[searchAsset.name] && topPrices[searchAsset.name]}
            name={asset.name}
            symbol={asset.symbol}
            changePercent={parseFloat(asset.changePercent24Hr)}
          />

          <CryptoDashboard />
        </div>
      </div>
    </>
  );
};

export default CryptoPage;
