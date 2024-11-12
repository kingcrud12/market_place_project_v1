// src/pages/Homepage.tsx

import React from 'react';
import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';
import ProductCard from '../components/ProductCard/ProductCard';
import Footer from '../components/Footer/Footer';
import './HomePage.css';

const Homepage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <div className="homepage">
      <Banner />
      <Header title="My E-Commerce Site" onSearch={handleSearch} />

      <div className="homepage__products">
        <ProductCard
          imageSrc="https://via.placeholder.com/300"
          title="Xbox Console"
          price="$299"
        />
        <ProductCard
          imageSrc="https://via.placeholder.com/300"
          title="Google Pixel 6 Pro"
          price="$899"
        />
        <ProductCard
          imageSrc="https://via.placeholder.com/300"
          title="Xiaomi FlipBuds Pro"
          price="$299"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;



