import React, { useEffect, useState } from "react";
import loadingIcon from "../assets/loading.svg";
import SearchBar from "../components/SearchBar";
import { Pokemon } from "../types/Pokemon";

interface WhosThatPokemonProps {
  username: string;
}

const WhosThatPokemon: React.FC<WhosThatPokemonProps> = ({ username }) => {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [substring, setSubstring] = useState("");
  const [win, setWin] = useState<null | boolean>(null);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const fetchRandomPokemon = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/pokemon/random`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (response.ok) {
        setPokemon(await response.json());
      } else {
        const errorText = await response.text();
        console.error(`Error fetching random pokemon:${errorText}`);
      }
    } catch (error) {
      console.error(`Unable to send request:${error}`);
    } finally {
      setLoading(false);
    }
  };

  const checkReponse = () => {
    if (substring.toLocaleLowerCase() === pokemon?.name) {
      setWin(true);
      updatePokemonCount();
    } else setWin(false);
  };

  const updatePokemonCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/${username}/updatePokemonCount`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );
      alert(await response.text());
    } catch (error) {
      console.error(`Unable to send request:${error}`);
    }
  };

  const replay = () => {
    setWin(null);
    setSubstring("");
    fetchRandomPokemon();
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <img src={loadingIcon} alt="Loading" className="loading-icon" />
        </div>
      ) : (
        <>
          <div className="center margin">
            {pokemon?.image && <img src={pokemon.image} width="180px" />}
          </div>
          <SearchBar
            placeHolder="Who's the name of that pokemon?"
            substring={substring}
            setSubstring={setSubstring}
            search={false}
            onClick={checkReponse}
          />
          {win === false && (
            <div className="center">
              <p className="red">Wrong answer :( Try again!</p>
            </div>
          )}
          {win === true && (
            <>
              <div className="center">Congratulation! You won a point!</div>
              <div className="center">
                <button className="button" onClick={replay}>
                  Replay
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default WhosThatPokemon;
