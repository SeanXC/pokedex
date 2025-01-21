import React, { useEffect, useState } from 'react';
import PokemonList from '../components/PokemonList';
import { Pokemon } from '../types/Pokemon';
import loadingIcon from '../assets/loading.svg';

const Pokedex: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const initialPokemonList: Pokemon[] = [
    { id: 1, name: 'Bulbasaur', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', types: ['Grass', 'Poison'], isFavorite: false },
    { id: 4, name: 'Charmander', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', types: ['Fire'], isFavorite: false },
    { id: 25, name: 'Pikachu', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', types: ['Electric'], isFavorite: false },
  ];

  useEffect(() => {
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
        <PokemonList pokemons={initialPokemonList} />
      )}
    </div>
  );
};

export default Pokedex;
