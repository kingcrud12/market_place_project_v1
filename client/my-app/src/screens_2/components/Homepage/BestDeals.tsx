import React from 'react';
import Arrowblue from '../../../assets_2/icons/Regular/Regular/ArrowRight.svg';
import CountdownTimer from './CountdownTimer'
import ProductCard from './ProductCard';
import PS5Image from '../../../assets_2/image/Image_ps5.png'
import Drone from '../../../assets_2/image/Drone.svg'
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
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 2300,  
        isHot: false,
        isSoldOut: true,
        imageUrl: Drone, 
      },

      {
        id: 4,
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 2300,  
        isHot: false,
        isSoldOut: true,
        imageUrl: Drone, 
      },

      {
        id: 5,
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 2300,  
        isHot: false,
        isSoldOut: true,
        imageUrl: Drone, 
      },

      {
        id: 6,
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 2300,  
        isHot: false,
        isSoldOut: true,
        imageUrl: Drone, 
      },

      {
        id: 7,
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 2300,  
        isHot: false,
        isSoldOut: true,
        imageUrl: Drone, 
      },

      {
        id: 8,
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 2300,  
        isHot: false,
        isSoldOut: true,
        imageUrl: Drone, 
      },

      {
        id: 9,
        name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...",
        price: 2300,  
        isHot: false,
        isSoldOut: true,
        imageUrl: Drone, 
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
                    <ProductCard product={products[0]} />
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