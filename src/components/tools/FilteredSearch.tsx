import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { SearchAsset } from "../../services/cryptocompareApi";

export default function FilteredSearch({ search, setFind }: any) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleOnClick = (
    symbol: string,
    name: string,
    id: string,
    img: string
  ) => {
    dispatch(SearchAsset(symbol, name.toLowerCase(), id, img));
    setFind([]);
    history.push(`/crypto/details`);
  };

  return (
    <div className="filter-search mx-10">
      {search.map((c: any) => (
        <div
          key={c.id}
          onClick={() => handleOnClick(c.symbol, c.name, c.id, c.iconUrl)}
          className="search-item cursor-pointer"
        >
          <img
            className="w-5 h-5 rounded-full overflow-hidden object-cover mr-4"
            src={c.iconUrl}
            alt={c.name}
          />
          <h1>{c.symbol} </h1>
          <h1 className="secondary ml-2">{c.name}</h1>
        </div>
      ))}
    </div>
  );
}
