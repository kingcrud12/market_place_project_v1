import React from 'react';
import HeartIcon from '../../../assets_2/icons/Heartwhite.svg';
import CartIcon from '../../../assets_2/icons/ShoppingCartSimple3.svg';
import EyeIcon from '../../../assets_2/icons/Regular/Eye.svg';
import './GeneralProducts.css';


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

  interface GeneralProductsProps {
    product: Product;
  }

  const GeneralProducts: React.FC<GeneralProductsProps> = ({ product }) => {
    return (
        <div className='general-product'>
        <div className={`general-product-card ${product.isSoldOut ? 'sold-out' : ''}`}>
          <div className="general-product-badge">
            {product.isSoldOut && <span className="general-sold-out-badge">SOLD OUT</span>}
            {product.discount && <span className="general-discount">{product.discount}</span>}
            {product.isHot && <span className="general-hot-badge">HOT</span>} 
          </div>
          <div className='general-image-grid'>
          <img src={product.imageUrl} alt={product.name} />
          {/* Boutons d'action qui apparaissent au survol */}
          <div className="general-action-buttons">
                <div className="action-button-wishlist">
                  <img src={HeartIcon} alt="Add to Wishlist" className='general-icon-button-wishlist' />
                </div>
                <div className="action-button-cart">
                  <img src={CartIcon} alt="Add to Cart" className='general-icon-button-cart' />
                </div>
                <div className="action-button-details">
                  <img src={EyeIcon} alt="View Details" className='general-icon-button-details' />
                </div>
              </div>
          </div>
          <div className="general-product-info">
            <div className="general-content-info">
                <span className="general-name-grid">{product.name}</span>
                <span className="price">
                    {product.originalPrice && <span className="general-original-price">${product.originalPrice.toFixed(2)}</span>}
                    <span className="general-current-price">${product.price.toFixed(2)}</span>
                </span>
            </div>
            {product.rating && (
              <div className="general-rating">
                {'★'.repeat(Math.floor(product.rating))} <span className='general-reviews'>({product.reviews})</span>
              </div>
            )}
            <span>{product.description}</span>
          </div>
    
          {product.inStock && <button className="general-add-to-cart-button">ADD TO CART</button>}
        </div>
        </div>
      );
    };
    
    export default GeneralProducts;