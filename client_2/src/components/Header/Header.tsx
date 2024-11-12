import React from 'react';
import { HeaderProps } from './Header.types';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';

const Header: React.FC<HeaderProps> = ({ title, onSearch }) => {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <SearchBar onSearch={onSearch} placeholder="Search for products..." />
    </header>
  );
};

export default Header;
