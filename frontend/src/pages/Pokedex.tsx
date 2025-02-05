import React from "react";
import PokemonList from "../components/PokemonList";
import { Pokemon } from "../types/Pokemon";
import SearchBar from "../components/SearchBar";
import loadingIcon from "../assets/loading.svg";

interface PokedexProps {
  username: string;
}

const Pokedex: React.FC<PokedexProps> = ({ username }) => {
  const [loading, setLoading] = React.useState(true);
  const [pokemonsLoading, setPokemonsLoading] = React.useState(false);
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);
  const [substring, setSubstring] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (substring !== "") fetchPokemons(); // TODO: remove if when backend works
    }, 300);
    return () => clearTimeout(handler);
  }, [substring]);

  const fetchPokemons = async () => {
    setPokemonsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/game/pokemon/substring/${substring}`, // TODO: username when backend works
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (response.ok) {
        const pokemonsResponse = await response.json();
        setPokemons(
          Array.isArray(pokemonsResponse)
            ? pokemonsResponse
            : pokemonsResponse.content || []
        );
      } else {
        const errorText = await response.text();
        console.error("Error fetching pokemons:", errorText);
      }
    } catch (error) {
      console.error("Unable to send request:", error);
    } finally {
      setPokemonsLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading">
          <img src={loadingIcon} alt="Loading" className="loading-icon" />
        </div>
      ) : (
        <>
          <SearchBar
            placeHolder="Search a pokemon by name or number"
            substring={substring}
            setSubstring={setSubstring}
          />
          {pokemonsLoading ? (
            <div className="loading">
              <img src={loadingIcon} alt="Loading" className="loading-icon" />
            </div>
          ) : (
            <PokemonList
              pokemons={pokemons}
              onToggleFavorite={() => {
                /*TODO*/
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Pokedex;
