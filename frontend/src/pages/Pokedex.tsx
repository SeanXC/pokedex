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
      fetchPokemons();
    }, 300);
    return () => clearTimeout(handler);
  }, [substring]);

  const fetchPokemons = async () => {
    setPokemonsLoading(true);
    try {
      const url =
        substring !== ""
          ? `http://localhost:8080/pokemon/${username}/substring/${substring}`
          : `http://localhost:8080/pokemon/${username}/substring`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (response.ok) {
        setPokemons(await response.json());
      } else {
        console.error("Error during fetchPokemons:", await response.text());
      }
    } catch (error) {
      console.error(`Unable to send request:${error}`);
    } finally {
      setPokemonsLoading(false);
    }
  };

  const toggleFavorite = async (
    pokemonName: string,
    isCurrentlyFavorite: boolean
  ) => {
    try {
      const url = `http://localhost:8080/user/${username}/${
        isCurrentlyFavorite ? "delete" : "add"
      }/${pokemonName}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (response.ok) {
        updateFavoriteStatus(pokemonName, !isCurrentlyFavorite);
        alert(await response.text());
      } else {
        console.error("Error during toggleFavorite: ", await response.text());
      }
    } catch (error) {
      console.error(`Unable to send request:${error}`);
    }
  };

  const updateFavoriteStatus = (
    pokemonName: string,
    favoriteUpdated: boolean
  ) => {
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) =>
        pokemon.name === pokemonName
          ? { ...pokemon, favorite: favoriteUpdated }
          : pokemon
      )
    );
  };

  return (
    <>
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
          ) : pokemons?.length !== 0 ? (
            <PokemonList
              pokemons={pokemons}
              onToggleFavorite={(pokemonName: string, isFavorite: boolean) =>
                toggleFavorite(pokemonName, isFavorite)
              }
            />
          ) : (
            <p className="center">No Pokémon matching your search!</p>
          )}
        </>
      )}
    </>
  );
};

export default Pokedex;
