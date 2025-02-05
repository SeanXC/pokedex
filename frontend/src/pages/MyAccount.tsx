import React, { useEffect, useState } from "react";
import loadingIcon from "../assets/loading.svg";
import PokemonList from "../components/PokemonList";
import "./MyAccount.css";
import { User } from "../types/User";

interface MyAccountProps {
  setPage: (page: string) => void;
  username: string;
}

const MyAccount: React.FC<MyAccountProps> = ({ setPage, username }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/user/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (response.ok) {
        setUser(await response.json());
      } else {
        const errorText = await response.text();
        console.error(`Error fetching user:${errorText}`);
      }
    } catch (error) {
      console.error(`Unable to send request:${error}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorite = async (pokemonName: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/${username}/delete/${pokemonName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      if (response.ok) {
        if (user) {
          const newFavorites = user.favorites.filter(
            (o) => o.name !== pokemonName
          );
          setUser({ ...user, favorites: newFavorites });
        }
        alert(await response.text());
      } else {
        console.error("Error during deleteFavorite", await response.text());
      }
    } catch (error) {
      console.error(`Unable to send request:${error}`);
    }
  };

  const handleLogout = () => {
    setPage("Home");
    alert("You have been logged out!");
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <img src={loadingIcon} alt="Loading" className="loading-icon" />
        </div>
      ) : (
        <>
          <div className="flex-end">
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="center">
            <div className="account-card">
              <i className="fas fa-user icon"></i>
              <h3>{user?.username}</h3>
              <p>{user?.pokemonCount} Finding</p>
            </div>
          </div>
          <h2>My favorite list</h2>
          {user?.favorites?.length && user?.favorites?.length > 0 ? (
            <>
              <PokemonList
                pokemons={user.favorites}
                onRemove={deleteFavorite}
                isFavoriteList={true}
              />
            </>
          ) : (
            <p className="no-favorites center">
              You haven't added any favorite Pokémon yet!
            </p>
          )}
        </>
      )}
    </>
  );
};

export default MyAccount;
