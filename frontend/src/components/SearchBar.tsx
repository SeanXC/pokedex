import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
  placeHolder: string;
  substring: string;
  setSubstring: (substring: string) => void;
  search?: boolean;
  onClick?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeHolder,
  substring,
  setSubstring,
  search = true,
  onClick = () => {},
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSubstring(value);
  };

  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      {search && <i className="fas fa-search search-icon"></i>}
      <input
        type="text"
        placeholder={placeHolder}
        className="search-bar-input"
        onChange={handleInputChange}
        value={substring}
      />
      {!search && (
        <a onClick={onClick}>
          <i className="fas fa-check validate-icon" title="Validate"></i>
        </a>
      )}
    </form>
  );
};

export default SearchBar;
