import React, { useEffect, useState } from 'react';
import loadingIcon from '../assets/loading.svg';
import userInf from '../assets/userInf.svg';
import PokemonList from '../components/PokemonList';
import { Pokemon } from '../types/Pokemon';
import './MyAccount.css';

interface MyAccountProps {
  favorites: Pokemon[];
  onToggleFavorite: (id: number) => void;
}

const MyAccount: React.FC<MyAccountProps> = ({ favorites, onToggleFavorite }) => {
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    alert('You have been logged out!');
  };

  const visibleFavorites = showAll ? favorites : favorites.slice(0, 5);

  return (
    <>
      {loading ? (
        <div className="loading">
          <img src={loadingIcon} alt="Loading" className="loading-icon" />
        </div>
      ) : (
        <div className="my-account">
          <div className="user-info">
            <img src={userInf} alt="User Background" className="user-icon" />
            <div className="user-details">
              <div className="username-container">
                <h2 className="user-name">Username</h2>
              </div>
              <div className="findings-container">
                <p className="findings">23 Finding</p>
              </div>
            </div>
            <button className="custom-logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>

          <h3 className="favorite-title">My favorite list</h3>
          {favorites.length > 0 ? (
            <>
              <PokemonList
                pokemons={visibleFavorites}
                onToggleFavorite={onToggleFavorite}
                onRemove={(id) => onToggleFavorite(id)}
                isFavoriteList={true}
              />
              <button
                className="view-more-button"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? 'View Less' : 'View More'}
              </button>
            </>
          ) : (
            <p className="no-favorites">You haven't added any favorite Pokémon yet!</p>
          )}
        </div>
      )}
    </>
  );
};

export default MyAccount;

