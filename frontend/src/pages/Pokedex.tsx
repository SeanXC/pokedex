import React from 'react';
import PokemonList from '../components/PokemonList';
import { Pokemon } from '../types/Pokemon';
import SearchBar from '../components/SearchBar';
import loadingIcon from '../assets/loading.svg';

interface PokedexProps {
  pokemons: Pokemon[];
  onToggleFavorite: (id: number) => void;
}

const Pokedex: React.FC<PokedexProps> = ({ pokemons, onToggleFavorite }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">
          <img src={loadingIcon} alt="Loading" className="loading-icon" />
        </div>
      ) : (
        <>
          <SearchBar placeHolder="Search a pokemon by name or number" onSearch={() => { } } />
          <PokemonList pokemons={pokemons} onToggleFavorite={onToggleFavorite} />
        </>
      )}
    </div>
  );
};

export default Pokedex;

