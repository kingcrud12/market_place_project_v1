import React from 'react';
import HeartButton from '../../../assets_2/icons/Heart2.svg'
import EyeButton from '../../../assets_2/icons/Regular/Eye.svg'
import './LargeProductCard.css';

interface LargeProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    rating?: number;
    reviews?: number;
    isHot?: boolean;
    isSoldOut?: boolean;
    imageUrl: string;
    description?: string;
    inStock?: boolean;
  };
}

const LargeProductCard: React.FC<LargeProductProps> = ({ product }) => {
  return (
    <div className="large-product-card">
      <div className="large-product-badge">
        {product.isSoldOut && <span className="large-sold-out-badge">SOLD OUT</span>}
        {product.discount && <span className="large-discount">{product.discount}</span>}
        {product.isHot && <span className="large-hot-badge">HOT</span>}
      </div>
      
      <img src={product.imageUrl} alt={product.name} className='large-image' />
     
      <div className="large-product-info">
        <div className="large-content-info">
        {product.rating && (
          <div className="large-rating">
            {'★'.repeat(Math.floor(product.rating))} <span className='large-reviews'>({product.reviews})</span>
          </div>
        )}
        <span className='large-name'>{product.name}</span>
        </div>
        <span className="large-price">
          {product.originalPrice && <span className="large-original-price">${product.originalPrice.toFixed(2)}</span>}
          <span className="large-current-price">${product.price.toFixed(2)}</span>
        </span>
        
        <span className='large-description'>{product.description}</span>
      </div>
      <div className='large-button'>
        <img src={HeartButton} alt='button add cart' className='large-icon' />
        {product.inStock && <button className="large-add-to-cart-button">ADD TO CART</button>}
        <img src={EyeButton} alt='button add cart' className='large-icon' />
      </div>
    </div>
  );
};

export default LargeProductCard;