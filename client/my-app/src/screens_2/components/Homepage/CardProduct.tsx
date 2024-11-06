// CardProduct.tsx
import React from 'react';
import './CardProduct.css';
import shopIcon from '../../../assets_2/icons/Regular/Multi-Currency/Regular/ArrowRight.svg'
import SmartFirst from '../../../assets_2/image/image_smart.png'
import Budpods from '../../../assets_2/image/xiamibudsnoir.png'

interface CardProductProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  imageUrl: string;
  currentCard: number;
  totalCards: number;
  onDotClick: (index: number) => void;
  onButtonClick: () => void;
}

const CardProduct: React.FC<CardProductProps> = ({ title, subtitle, description, price, imageUrl, currentCard, totalCards,onDotClick,onButtonClick }) => {
  return (
    <div className='card-objet'>
    <div className="card-principal">
      <div className="content-widget">
        <div className="caption">
          <span className="divider"></span>
          <span className="titre-content1">
            {subtitle}
          </span>  
        </div>
        <div className="titre-product">
          <span className="titre-name">
            {title}
          </span>
        </div>
        <div className= 'Description'>
          <span className= 'Description-product'>{description}</span>
        </div>
        <div>
        <button className="card-shop" onClick={onButtonClick}>
          Shop Now <img src={shopIcon} alt="button-card" className='card-icon'/>
        </button>
        </div>
      </div>
      {/* Navigation par points intégrée dans la carte */}
      <div className="product-details">
          <img src={imageUrl} alt={`pictur ${title}`} className="product-image"/>
          <span className="product-price">{price}</span>
        </div>
      <div className="dots-navigation">
        {Array.from({ length: totalCards }).map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentCard ? 'active' : ''}`} 
            onClick={() => onDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
    <div className='small-widget'>
      <div className='first-widget'>
        <div className='content-first'>
          <span className='title-content'>Summer Sales</span>
          <span className='title-product'>New Google Pixel 6 Pro</span>
          <button className="first-shop" onClick={onButtonClick}>
          Shop Now
          <img src={shopIcon} alt="button-card" className='first-icon'/>
          </button>
        </div>
        <div className= 'image-smart'>
          <img src={SmartFirst} alt='smartphone' className='tel-smart' />
        </div>
        <span className= 'badge-first'>29% OFF</span>

      </div>
      <div className='second-widget'>
        <img src={Budpods} alt='budpods' className='bud-pods' />
        <div className='content-second'>
          <span className='xiaomi-product'>
          Xiaomi FlipBuds Pro
          </span>
          <span className= 'price-second'>
          $299 USD
          </span>
          <button className="second-shop" onClick={onButtonClick}>
          Shop Now
          <img src={shopIcon} alt="button-card" className='first-icon'/>
          </button>

        </div>

      </div>
    </div>
    </div>
  );
};

export default CardProduct;