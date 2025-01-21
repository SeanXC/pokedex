import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types/Pokemon';
import './PokemonList.css';

interface PokemonListProps {
    pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>(pokemons);

    const onToggleFavorite = (id: number) => {
        setPokemonList((prevList) =>
            prevList.map((pokemon) =>
                pokemon.id === id ? { ...pokemon, isFavorite: !pokemon.isFavorite } : pokemon
            )
        );
    };

    return (
        <div className= "pokemonGrid" >
        {
            pokemonList.map((pokemon) => (
                <PokemonCard
                    id = { pokemon.id }
                    name = { pokemon.name } 
                    imageUrl = { pokemon.imageUrl }
                    types = { pokemon.types }
                    isFavorite = { pokemon.isFavorite }
                    onToggleFavorite = { onToggleFavorite }
                />
            ))
        }
        </div>
    );
};

export default PokemonList;
