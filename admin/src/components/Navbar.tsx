import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../screens/AdminHome.css'; // Importer le fichier de styles

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/'); // Rediriger vers la page de connexion
  };

  return (
    <div className="admin-home">
      <nav className="navbar">
        <div className="navbar-brand">
        </div>
        <ul className="navbar-menu">
          <li><Link to="/admin/products">Products</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/orders">Orders</Link></li>
        </ul>
        <div className="navbar-user">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="user-button">Logout</button>
          ) : (
            <Link to="/" className="user-button">Login</Link>
          )}
          {isLoggedIn && <Link to="/admin/profile" className="user-button">Profile</Link>}
        </div>
      </nav>
      <main className="admin-content">
        {/* Contenu principal de la page */}
      </main>
    </div>
  );
};

export default NavBar