import React from 'react';
import Header from '../components/Homepage/Header';
import Topwidget from '../components/Homepage/Topwidget';
import BestDeals from '../components/Homepage/BestDeals';
import Category from '../components/Homepage/Category';
import FeaturedProduct from '../components/Homepage/FeaturedProduct';
import './Homepage.css';

function Homepage () {
  return (

    <div className='homepage'>
        <Topwidget />
        <Header />
        <BestDeals /> 
        <Category />
        <FeaturedProduct />
        
      <main>
        <h1>Bienvenue sur la page d'accueil !</h1>
        <p>On va commencer par afficher les éléments et les ranger avant de pouvoir intégrer au fur et à mesure les assets.</p>
      </main>
    </div>
  );
};

export default Homepage;