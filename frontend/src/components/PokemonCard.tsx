import React from "react";
import "./PokemonCard.css";
import { Pokemon } from "../types/Pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onToggleFavorite?: (pokemonName: string) => void;
  onRemove?: (pokemonName: string) => void;
  isFavoriteList?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onToggleFavorite,
  onRemove,
  isFavoriteList = false,
}) => {
  return (
    <div className="card">
      {!isFavoriteList && onToggleFavorite && (
        <button
          className="favoriteButton"
          onClick={() => onToggleFavorite(pokemon.name)}
        >
          {pokemon.favorite ? "★" : "☆"}
        </button>
      )}

      {isFavoriteList && onRemove && (
        <button className="deleteButton" onClick={() => onRemove(pokemon.name)}>
          ✖
        </button>
      )}

      <img src={pokemon.image} alt={pokemon.name} className="image" />

      <h2 className="name">{pokemon.name}</h2>
      <span className="number">#{pokemon.id.toString().padStart(3, "0")}</span>

      <div className="types">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="type"
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };
  return typeColors[type] || "#A8A878";
};

export default PokemonCard;
