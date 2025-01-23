import { useState } from 'react';
import Header from './components/Header';
import Pokedex from './pages/Pokedex';
import WhosThatPokemon from './pages/WhosThatPokemon';
import MyAccount from './pages/MyAccount';
import '@fortawesome/fontawesome-free/css/all.css';


function App() {
  const [currentPage, setCurrentPage] = useState('Pokedex');

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

  return (
    <Header onNavigate={setCurrentPage} currentPage={currentPage}>
      {renderPage()}
    </Header>
  );
}

export default App;