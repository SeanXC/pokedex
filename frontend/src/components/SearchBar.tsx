import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    placeHolder: string;
    onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeHolder, onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    return (
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <i className="fas fa-search search-icon"></i>
            <input 
            type="text" 
            placeholder={placeHolder}
            className="search-bar-input"
            onChange={handleInputChange} 
            value={searchValue} 
            />
        </form>
    );
};

export default SearchBar;

