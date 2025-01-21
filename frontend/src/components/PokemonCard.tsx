import React from 'react';
import './PokemonCard.css';

interface PokemonCardProps {
    id: number;
    name: string;
    imageUrl: string;
    types: string[];
    isFavorite?: boolean;
    onToggleFavorite: (id: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, imageUrl, types, isFavorite = false, onToggleFavorite }) => {
    return (
        <div className="card">
            <button className="favoriteButton" onClick={() => onToggleFavorite(id)}>
                {isFavorite ? '★' : '☆'}
            </button>
            
            <img src={imageUrl} alt={name} className="image"/>

            <h2 className="name">{name}</h2>
            <span className="number">#{id.toString().padStart(3, '0')}</span>
            
            <div className="types">
                {types.map((type) => (
                    <span key={type} className="type" style={{ backgroundColor: getTypeColor(type) }}>
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
};

const getTypeColor = (type: string): string => {
    const typeColors: Record<string, string> = {
        Normal: '#A8A878',
        Fire: '#F08030',
        Water: '#6890F0',
        Electric: '#F8D030',
        Grass: '#78C850',
        Ice: '#98D8D8',
        Fighting: '#C03028',
        Poison: '#A040A0',
        Ground: '#E0C068',
        Flying: '#A890F0',
        Psychic: '#F85888',
        Bug: '#A8B820',
        Rock: '#B8A038',
        Ghost: '#705898',
        Dragon: '#7038F8',
        Dark: '#705848',
        Steel: '#B8B8D0',
        Fairy: '#EE99AC',
    };
    return typeColors[type] || '#A8A878'; //Default color
};

export default PokemonCard;
