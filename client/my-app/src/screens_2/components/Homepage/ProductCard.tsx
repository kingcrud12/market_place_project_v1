import React from 'react';
import './ProductCard.css';

interface Product {
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
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className='best-deal-product'>
    <div className={`product-card ${product.isSoldOut ? 'sold-out' : ''}`}>
      <div className="product-image">
        {product.isSoldOut && <span className="sold-out-badge">SOLD OUT</span>}
        {product.discount && <span className="discount">{product.discount}</span>}
        {product.isHot && <span className="hot-badge">HOT</span>}
        <img src={product.imageUrl} alt={product.name} />  
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        {product.rating && (
          <div className="rating">
            {'★'.repeat(Math.floor(product.rating))} <span>({product.reviews})</span>
          </div>
        )}
         <p className="price">
          {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
          <span className="current-price">${product.price.toFixed(2)}</span>
        </p>
        <span>{product.description}</span>
      </div>
      {product.inStock && <button className="add-to-cart-button">ADD TO CART</button>}
    </div>
    </div>
  );
};

export default ProductCard;