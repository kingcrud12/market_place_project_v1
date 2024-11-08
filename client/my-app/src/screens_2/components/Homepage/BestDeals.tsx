import React from 'react';
import Arrowblue from '../../../assets_2/icons/Regular/Regular/ArrowRight.svg';
import CountdownTimer from './CountdownTimer'
import ProductCard from './ProductCard';
import LargeProductCard from './LargeProductCard';
import PS5Image from '../../../assets_2/image/Image_ps5.png'
import Drone from '../../../assets_2/image/Drone.svg'
import Tel2 from '../../../assets_2/products/tel2.png'
import Manette4 from '../../../assets_2/products/manette4.png'
import Ecouteur5 from '../../../assets_2/products/ecouteur5.png'
import Portable6 from '../../../assets_2/products/portable6.png'
import Drone7 from '../../../assets_2/products/drone7.png'
import Pc8 from '../../../assets_2/products/pc8.png'
import Webcam9 from '../../../assets_2/products/webcam9.png'
import './BestDeals.css';

const products = [
    {
        id: 1,
        name: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versio...",
        price: 442.12,
        originalPrice: 865.99,
        discount: "32% OFF",
        rating: 5,
        reviews: 52677,
        isHot: true,
        isSoldOut: false,
        imageUrl: PS5Image,
        description: 'Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.',
        inStock: true,
      },
      
      {
        id: 2,
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 2300,  
        isHot: false,
        isSoldOut: true,
        imageUrl: Drone, 
      },

      {
        id: 3,
        name: "Simple Mobile 4G LTE Prepaid Smartphone",
        price: 220, 
        isHot: false,
        isSoldOut: false,
        imageUrl: Tel2, 
      },

      {
        id: 4,
        name: "4K UHD LED Smart TV with Chromecast Built-in",
        price: 150, 
        originalPrice: 865,
        discount: "19% OFF",
        isHot: false,
        isSoldOut: false,
        imageUrl: Manette4, 
      },

      {
        id: 5,
        name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
        price: 1200,  
        isHot: false,
        isSoldOut: false,
        imageUrl: Ecouteur5, 
      },

      {
        id: 6,
        name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
        price: 299,  
        isHot: false,
        isSoldOut: false,
        imageUrl: Portable6, 
      },

      {
        id: 7,
        name: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM",
        price: 70,  
        originalPrice: 865.99,
        isHot: false,
        isSoldOut: false,
        imageUrl: Drone7, 
      },

      {
        id: 8,
        name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower",
        price: 160,  
        isHot: true,
        isSoldOut: false,
        imageUrl: Pc8, 
      },

      {
        id: 9,
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 250,  
        isHot: false,
        discount: "32% OFF",
        isSoldOut: false,
        imageUrl: Webcam9, 
      },

      

    ];


function BestDeals () {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 16);
  
    return (
    

    <div className='today-best-deals'>
        <div className='best-deals'>
            <div className='content-best'>
                <span className='best-deals-title'>Best Deals</span>
                <div className= 'deals-time'>
                    <span className='Deals-ends-in'>Deals ends in</span>
                    <div className='time'>
                    <CountdownTimer targetDate={targetDate}  />
                    </div>
                </div>
            </div>
            <button className='button-browser'>
            <span className='browse-product'>Browse All Product </span>
            <img src={Arrowblue} alt='Button-all-broowser' />
            </button>
        </div>

        <div className="product-layout">
                {/* Première carte indépendante */}
                <div className="first-product-card">
                    <LargeProductCard product={products[0]} />
                </div>

                {/* Autres cartes en grille */}
                <div className="other-products-grid">
                    {products.slice(1).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>


    </div> 
  );
};

export default BestDeals;