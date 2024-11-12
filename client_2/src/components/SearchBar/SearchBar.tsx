import React from 'react';
import { SearchBarProps } from './SearchBar.types';
import './SearchBar.css';

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder={placeholder || "Search for anything..."} 
        onChange={handleSearch} 
        className="search-input" 
      />
      <button className="search-button">
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
