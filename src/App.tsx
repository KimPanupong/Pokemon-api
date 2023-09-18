import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/card/card";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PokemonPage: React.FC = () => {
  const [pokeData, setPokeData] = useState<any[]>([]);
  const [url] = useState("https://pokeapi.co/api/v2/pokemon");
  const [sortOption, setSortOption] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}?offset=0&limit=100000`);
        const pokemonList = await Promise.all(
          res.data.results.map(async (item: any) => {
            const result = await axios.get(item.url);
            return result.data;
          })
        );

        if (sortOption === "name") {
          pokemonList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === "id") {
          pokemonList.sort((a, b) => a.id - b.id);
        }
        setPokeData(pokemonList);
      } catch (error) {
        console.error("fetch data error ", error);
      }
    };
    fetchData();
  }, [url, sortOption]);

  const handleSortChange = (event: any) => {
    setSortOption(event.target.value);
  };

  const totalPages = Math.ceil(pokeData.length / perPage);

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startPage = (currentPage - 1) * perPage;
  const endPage = startPage + perPage;
  const currentDataPage = pokeData.slice(startPage, endPage);

  return (
    <div className="container custom-container">
      <div className="header">
        <h1>All Pokemon!</h1>
        <ul>
          <li>
            <input
              type="radio"
              value="name"
              checked={sortOption === "name"}
              onChange={handleSortChange}
            />
            <h2>Sort Name</h2>
          </li>
          <li>
            <input
              type="radio"
              value="id"
              checked={sortOption === "id"}
              onChange={handleSortChange}
            />
            <h2>Sort ID</h2>
          </li>
        </ul>
      </div>

      <div>
        <div className="card-info">
          <Card pokemon={currentDataPage} />
        </div>
        <div className="right-content"></div>
      </div>

      <div className="pagination mt-2">
        <button onClick={prev} disabled={currentPage === 1}>
          Previous 12
        </button>
        <button onClick={next} disabled={currentPage === totalPages}>
          Next 12
        </button>
      </div>
    </div>
  );
};

export default PokemonPage;
