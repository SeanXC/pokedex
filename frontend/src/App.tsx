import { useState } from 'react';
import Header from './components/Header';
import Pokedex from './pages/Pokedex';
import WhosThatPokemon from './pages/WhosThatPokemon';
import MyAccount from './pages/MyAccount';
import '@fortawesome/fontawesome-free/css/all.css';

import { Pokemon } from './types/Pokemon';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('Pokedex');

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([
    { id: 1, name: 'Bulbasaur', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', types: ['Grass', 'Poison'], isFavorite: false },
    { id: 4, name: 'Charmander', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', types: ['Fire'], isFavorite: false },
    { id: 25, name: 'Pikachu', imageUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', types: ['Electric'], isFavorite: false },
  ]);

  const toggleFavorite = (id: number) => {
    setPokemonList((prevList) =>
      prevList.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, isFavorite: !pokemon.isFavorite } : pokemon
      )
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Pokedex':
        return <Pokedex pokemons={pokemonList} onToggleFavorite={toggleFavorite} />;
      case 'WhosThatPokemon':
        return <WhosThatPokemon />;
      case 'MyAccount':
        return (
          <MyAccount
            favorites={pokemonList.filter((pokemon) => pokemon.isFavorite)}
            onToggleFavorite={toggleFavorite} 
          />
        );
      default:
        return <Pokedex pokemons={pokemonList} onToggleFavorite={toggleFavorite} />;
    }
  };

  return (
    <Header onNavigate={setCurrentPage} currentPage={currentPage}>
      {renderPage()}
    </Header>
  );
}

export default App;


