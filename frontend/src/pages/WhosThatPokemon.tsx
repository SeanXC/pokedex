import React from 'react';
import SearchBar from '../components/SearchBar';
import { Pokemon } from '../types/Pokemon';

const WhosThatPokemon: React.FC = () => {
  const pokemon: Pokemon =
    { id: 1, name: 'Bulbasaur', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', types: ['Grass', 'Poison'], isFavorite: false }; 
  
  return (
    <>
      <div className='center margin'>
        <img src={pokemon.imageUrl} width="180px" />
      </div>
      <SearchBar placeHolder="Who's the name of that pokemon?" onSearch={()=>{}} />
    </>
  );
};

export default WhosThatPokemon;