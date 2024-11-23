import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Homepage/Header';
import Topwidget from '../components/Homepage/Topwidget';
import BestDeals from '../components/Homepage/BestDeals';
import Category from '../components/Homepage/Category';
import FeaturedProduct from '../components/Homepage/FeaturedProduct';
import SmallBanner from '../components/Homepage/SmallBanner'
import LargeBanner from '../components/Homepage/LargeBanner';
import './Homepage.css';
import ComputerAccessories from '../components/Homepage/ComputerAccessories';
import LatestNews from '../components/Homepage/LatestNews';
import Newsletter from '../components/Homepage/Newsletter';
import Footer from '../components/Homepage/Footer';
import ProductGrid from '../components/Homepage/ProductGrid';

function Homepage () {
  const navigate = useNavigate();
  return (

    <div className='homepage'>
        <Topwidget />
        <Header />
        <BestDeals /> 
        <Category />
        <FeaturedProduct />
        <SmallBanner />
        <ComputerAccessories />
        <LargeBanner />
        <ProductGrid />
        <LatestNews />
        <Newsletter />
        <Footer />

        {/* Bouton pour naviguer vers Signin */}
      <button
        onClick={() => navigate('/signin')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#FF7A00',
          color: '#FFF',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Test
        </button>
    </div>
  );
};

export default Homepage;