import { useState } from 'react';
import Header from './components/Header';
import Pokedex from './pages/Pokedex';
import WhosThatPokemon from './pages/WhosThatPokemon';
import MyAccount from './pages/MyAccount';
import Home from "./pages/Home";

function App() {
  const [currentPage, setCurrentPage] = useState('Pokedex');
  let logged_in = false; 

  const renderPage = () => {
    switch (currentPage) {
      case 'Pokedex':
        return <Pokedex />;
      case 'WhosThatPokemon':
        return <WhosThatPokemon />;
      case 'MyAccount':
        return <MyAccount />;
      default:
        return <Pokedex />;
    }
  };

  if(logged_in) {
    return (
      <Header onNavigate={setCurrentPage} currentPage={currentPage}>
        {renderPage()}
      </Header>
    );
  } else {
    return (
      <Home />
    );
  }
}

export default App;