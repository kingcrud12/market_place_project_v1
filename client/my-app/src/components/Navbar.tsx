import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';
import ImageSVG from '../assets/ImageS.svg';

interface NavbarProps {
  cartCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount = 0 }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Vous devez être connecté pour vous déconnecter.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/market_place/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/signin');
        alert('Vous avez été déconnecté avec succès.');
      } else {
        const data = await response.json();
        alert(`Erreur lors de la déconnexion : ${data.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      alert('Une erreur est survenue lors de la déconnexion.');
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate('/')}>
          Fruits lovers
        </div>
        <ul className="navbar-links">
          <li><a href="/men">Découvrez nos boissons</a></li>
        </ul>
        <div className="cart-icon" onClick={handleCartClick}>
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* Affiche le badge */}
        </div>
        <div className="user-menu">
          <div className="user-icon" onClick={toggleUserMenu}>
            <img src={ImageSVG} alt="User Icon" className="user-avatar" />
          </div>
          {showUserMenu && (
            <div className="user-menu-dropdown">
              <button onClick={handleProfile}>Profile</button>
              <button onClick={handleSettings}>Mes commandes</button>
              {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button onClick={handleLogin}>Login</button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
