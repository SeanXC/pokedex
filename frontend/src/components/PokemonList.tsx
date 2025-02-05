import React from "react";
import PokemonCard from "./PokemonCard";
import { Pokemon } from "../types/Pokemon";
import "./PokemonList.css";

interface PokemonListProps {
  pokemons: Pokemon[];
  onToggleFavorite?: (pokemonName: string, isFavorite: boolean) => void;
  onRemove?: (pokemonName: string) => void;
  isFavoriteList?: boolean;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemons,
  onToggleFavorite,
  onRemove,
  isFavoriteList = false,
}) => {
  return (
    <div className="pokemonGrid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onToggleFavorite={
            onToggleFavorite
              ? () => onToggleFavorite(pokemon.name, pokemon.favorite)
              : undefined
          }
          onRemove={onRemove ? () => onRemove(pokemon.name) : undefined}
          isFavoriteList={isFavoriteList}
        />
      ))}
    </div>
  );
};

export default PokemonList;
