import React, { useState } from 'react';
import './HomePage.css'; // Assure-toi de créer ce fichier CSS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const HomePage: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  const updateCartCount = (count: number) => {
    setCartCount(count);
  };

  return (
    <div className="homepage">
      <Navbar cartCount={cartCount} /> {/* Passe cartCount au Navbar */}
      <main className="homepage-content">
        <h1>Bienvenue sur notre boutique en ligne</h1>
        <div className="homepage-images">
          {/* Intégration du composant HeroSection ici */}
          <HeroSection updateCartCount={updateCartCount} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

