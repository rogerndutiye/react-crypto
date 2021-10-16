import { useAppDispatch } from "../../app/hooks";
import { GetDailyOHLCV } from "../../services/cryptocompareApi";

interface OverviewActionsProps {
  symbol: string;
}

export default function OverviewActions({ symbol }: OverviewActionsProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="crypto-actions">
      <div>
        <button
          onClick={() => dispatch(GetDailyOHLCV("60", symbol, "histominute"))}
        >
          1H
        </button>
        <button
          onClick={() => dispatch(GetDailyOHLCV("24", symbol, "histohour"))}
        >
          24H
        </button>
        <button
          onClick={() => dispatch(GetDailyOHLCV("168", symbol, "histohour"))}
        >
          1W
        </button>
        <button onClick={() => dispatch(GetDailyOHLCV("30", symbol))}>
          1M
        </button>
        <button
          className="active"
          onClick={() => dispatch(GetDailyOHLCV("180", symbol))}
        >
          6M
        </button>
        <button onClick={() => dispatch(GetDailyOHLCV("365", symbol))}>
          1Y
        </button>
      </div>

      <div>
        <button>Original</button>
        <button>Trading View</button>
        <button>Depth</button>
      </div>
    </div>
  );
}
