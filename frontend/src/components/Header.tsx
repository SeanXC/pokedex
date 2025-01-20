import React from 'react';
import './Header.css';
import logo from '../assets/logo.svg';

interface HeaderProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ children, onNavigate, currentPage }) => {
  return (
    <div className="layout">
      <header className="header">
        <img src={logo} alt="PokeQuiz Logo" className="logo" />
        <nav>
          <div className="nav-left">
            <button
              onClick={() => onNavigate('Pokedex')}
              className={currentPage === 'Pokedex' ? 'active' : ''}
            >
              Pokedex
            </button>
          </div>
          <div className="nav-center">
            <button
              onClick={() => onNavigate('WhosThatPokemon')}
              className={currentPage === 'WhosThatPokemon' ? 'active' : ''}
            >
              Who’s that pokemon
            </button>
          </div>
          <div className="nav-right">
            <button
              onClick={() => onNavigate('MyAccount')}
              className={currentPage === 'MyAccount' ? 'active' : ''}
            >
              My account
            </button>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Header;
