import React from "react";
import "./PokemonCard.css";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: string[];
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onRemove?: () => void;
  isFavoriteList?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  image,
  types,
  isFavorite = false,
  onToggleFavorite,
  onRemove,
  isFavoriteList = false,
}) => {
  return (
    <div className="card">
      {!isFavoriteList && onToggleFavorite && (
        <button className="favoriteButton" onClick={() => onToggleFavorite()}>
          {isFavorite ? "★" : "☆"}
        </button>
      )}

      {isFavoriteList && onRemove && (
        <button className="deleteButton" onClick={() => onRemove()}>
          ✖
        </button>
      )}

      <img src={image} alt={name} className="image" />

      <h2 className="name">{name}</h2>
      <span className="number">#{id.toString().padStart(3, "0")}</span>

      <div className="types">
        {types.map((type) => (
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
