import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "./queries";
import { Sneakers, Items } from "./interfaces";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import useDebounceSearch from "./hooks/useDebounceSearch";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const debouncedSearch = useDebounceSearch(searchValue);

  const [getAllItems, { data, error, loading }] = useLazyQuery<Items>(GET_ALL_ITEMS, {
    variables: { searchValue: `%${debouncedSearch}%` }
  });

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!data) {
      getAllItems();
    }
    if (debouncedSearch) {
      getAllItems();
    }
  }, [debouncedSearch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="App">
      <Home
        isLoading={loading}
        onAddToCart={() => {}}
        onAddToFavorite={() => {}}
        items={data?.items || []}
        onChangeSearchInput={onChangeSearchInput}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  );
}

export default App;
