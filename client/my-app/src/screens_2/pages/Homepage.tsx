import React from 'react';
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
    
    </div>
  );
};

export default Homepage;