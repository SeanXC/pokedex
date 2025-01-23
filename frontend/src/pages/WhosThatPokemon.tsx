import React, { useEffect, useState } from 'react';
import loadingIcon from '../assets/loading.svg';
import SearchBar from '../components/SearchBar';
import { Pokemon } from '../types/Pokemon';

const WhosThatPokemon: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const pokemon: Pokemon =
    { id: 1, name: 'Bulbasaur', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', types: ['Grass', 'Poison'], isFavorite: false }; 

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
        <>
          <div className='center margin'>
            <img src={pokemon.imageUrl} width="180px" />
          </div>
          <SearchBar placeHolder="Who's the name of that pokemon?" onSearch={()=>{}} />
        </>
      )}
    </div>
  );
};

export default WhosThatPokemon;
