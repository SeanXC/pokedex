import React from "react";
import "./Header.css";
import logo from "../assets/logo.svg";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <>
      <header className="header">
        <div className="center">
          <img src={logo} alt="PokeQuiz Logo" className="logo" />
        </div>
        <div className="nav">
          <button
            onClick={() => onNavigate("Pokedex")}
            className={currentPage === "Pokedex" ? "active" : ""}
          >
            Pokedex
          </button>
          <button
            onClick={() => onNavigate("WhosThatPokemon")}
            className={currentPage === "WhosThatPokemon" ? "active" : ""}
          >
            Who’s that pokemon
          </button>
          <button
            onClick={() => onNavigate("MyAccount")}
            className={currentPage === "MyAccount" ? "active" : ""}
          >
            My account
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
