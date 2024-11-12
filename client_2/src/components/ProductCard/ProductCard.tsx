import React from 'react';
import './ProductCard.css';
import { ProductCardProps } from './ProductCard.types';

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, price }) => {
  return (
    <div className="product-card">
      <img src={imageSrc} alt={title} className="product-image" />
      <h3 className="product-title">{title}</h3>
      <p className="product-price">${price}</p>
    </div>
  );
};

export default ProductCard;
