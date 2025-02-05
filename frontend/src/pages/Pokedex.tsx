import React from 'react';
import PokemonList from '../components/PokemonList';
import { Pokemon } from '../types/Pokemon';

const Pokedex: React.FC = () => {
  const initialPokemonList: Pokemon[] = [
    { id: 1, name: 'Bulbasaur', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', types: ['Grass', 'Poison'], isFavorite: false },
    { id: 4, name: 'Charmander', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', types: ['Fire'], isFavorite: false },
    { id: 25, name: 'Pikachu', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', types: ['Electric'], isFavorite: false },
  ]; 

  return (
    <PokemonList pokemons={initialPokemonList}/>
  )
};

export default Pokedex;
