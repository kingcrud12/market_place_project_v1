import React from "react";
import LogoClicon from '../../../assets_2/branding/logo/Icon2.svg';
import ArrowRight from '../../../assets_2/branding/Regular/ArrowRight.svg';
import PlayStore from '../../../assets_2/branding/Icon=google-play 1.svg';
import AppStore from '../../../assets_2/branding/Apple---Negative 1.svg';
import "./Footer.css"; 

const Footer: React.FC = () => {
  
    return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo et support client */}
        <div className="footer-section-one">
          <span className="footer-logo">
            <img src={LogoClicon}  alt="logo-clicon" />
            CLICON
            </span>
          <div className= "contact-info-footer">
            <div className="Customer-number">
                <span className="footer-label">Customer Support:</span>
                <span className="footer-info">(629) 555-0129</span>
            </div>
            <span className="footer-adress">4517 Washington Ave. Manchester, Kentucky 39495</span>
            <a href="mailto:info@kinbo.com" className="footer-link-one">
              info@kinbo.com
            </a>
          </div>
        </div>

        {/* Catégories principales */}
        <div className="footer-section">
          <span className="footer-heading">Top Category</span>
          
          <ul className="footer-list">
            <li>Computer & Laptop</li>
            <li>SmartPhone</li>
            <li>Headphone</li>
            <li className="footer-accessories">
                <span className="footer-divider"></span>
                Accessories
            </li>
            <li>Camera & Photo</li>
            <li>TV & Homes</li>
            <li>
                <a href="/" className="footer-link">
                Browse All Product 
                <img src={ArrowRight} alt='' />
                </a>
            </li>
          </ul>
          
        </div>

        {/* Liens rapides */}
        <div className="footer-section">
          <span className="footer-heading">Quick Links</span>
          <ul className="footer-list">
            <li>Shop Product</li>
            <li>Shopping Cart</li>
            <li>Wishlist</li>
            <li>Compare</li>
            <li>Track Order</li>
            <li>Customer Help</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Applications à télécharger */}
        <div className="footer-section-two">
          <span className="footer-heading">Download App</span>
          <div className="footer-buttons">
            <a href="https://play.google.com" className="footer-button">
            <img src={PlayStore} alt='google play' />
            <div className='footer-button-write'>
              <span className='first-written-footer-button'>Get it now</span> 
              <span className='second-written-footer-button'>Google Play</span>
              </div>
            </a>
            <a href="https://www.apple.com/app-store/" className="footer-button">
            <img src={AppStore} alt='Appstore' />
            <div className='footer-button-write'>
              <span className='first-written-footer-button'>Get it now</span> 
              <span className='second-written-footer-button'>App Store</span>
              </div>
            </a>
          </div>
        </div>

        {/* Tags populaires */}
        <div className="footer-section-three">
          <span className="footer-heading">Popular Tag</span>
          <div className="footer-tags">
            {[
              "Game",
              "iPhone",
              "TV",
              "Asus Laptops",
              "Macbook",
              "SSD",
              "Graphics Card",
              "Power Bank",
              "Smart TV",
              "Speaker",
              "Tablet",
              "Microwave",
              "Samsung",
            ].map((tag) => (
              <button key={tag} className="footer-tag">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bas */}
      <div className="footer-bottom">
        <span className="footer-bottom-writter">Kinbo - eCommerce Template © 2021. Design by Templatecookie</span>
      </div>
    </footer>
  );
};

export default Footer;