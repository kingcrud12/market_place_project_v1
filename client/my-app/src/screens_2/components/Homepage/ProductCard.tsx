import React from 'react';
import HeartIcon from '../../../assets_2/icons/Heartwhite.svg'
import CartIcon from '../../../assets_2/icons/ShoppingCartSimple3.svg'
import EyeIcon from '../../../assets_2/icons/Regular/Eye.svg'
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
      <div className="product-badge">
        {product.isSoldOut && <span className="sold-out-badge">SOLD OUT</span>}
        {product.discount && <span className="discount">{product.discount}</span>}
        {product.isHot && <span className="hot-badge">HOT</span>} 
      </div>
      <div className='image-grid'>
      <img src={product.imageUrl} alt={product.name} />
      {/* Boutons d'action qui apparaissent au survol */}
      <div className="action-buttons">
            <div className="action-button-wishlist">
              <img src={HeartIcon} alt="Add to Wishlist" className='icon-button-wishlist' />
            </div>
            <div className="action-button-cart">
              <img src={CartIcon} alt="Add to Cart" className='icon-button-cart' />
            </div>
            <div className="action-button-details">
              <img src={EyeIcon} alt="View Details" className='icon-button-details' />
            </div>
          </div>
      </div>
      <div className="product-info">
        <div className="content-info">
            <span className="name-grid">{product.name}</span>
            <span className="price">
                {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
                <span className="current-price">${product.price.toFixed(2)}</span>
            </span>
        </div>
        {product.rating && (
          <div className="rating">
            {'★'.repeat(Math.floor(product.rating))} <span>({product.reviews})</span>
          </div>
        )}
        <span>{product.description}</span>
      </div>

      {product.inStock && <button className="add-to-cart-button">ADD TO CART</button>}
    </div>
    </div>
  );
};

export default ProductCard;