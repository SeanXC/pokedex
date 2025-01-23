import React from 'react';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types/Pokemon';
import './PokemonList.css';

interface PokemonListProps {
  pokemons: Pokemon[];
  onToggleFavorite: (id: number) => void;
  onRemove?: (id: number) => void; 
  isFavoriteList?: boolean; 
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  onToggleFavorite,
  onRemove, 
  isFavoriteList = false,
}) => {
  return (
    <div className="pokemonGrid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          imageUrl={pokemon.imageUrl}
          types={pokemon.types}
          isFavorite={pokemon.isFavorite}
          onToggleFavorite={onToggleFavorite}
          onRemove={onRemove} 
          isFavoriteList={isFavoriteList} 
        />
      ))}
    </div>
  );
};

export default PokemonList;

