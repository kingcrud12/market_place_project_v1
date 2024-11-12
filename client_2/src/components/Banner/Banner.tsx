// Banner.tsx
import React from 'react';
import './Banner.css';

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div className="banner-top">
        <div className="banner-highlight">
          <div className="banner-highlight-text">Black</div>
        </div>
        <div className="banner-title">Friday</div>
        <div className="banner-offer">
          <div className="banner-offer-text">Up to</div>
          <div className="banner-discount">59%</div>
          <div className="banner-offer-text">OFF</div>
        </div>
        <div className="banner-shop-now">
          <div className="banner-shop-now-text">Shop now</div>
          <div className="banner-icon-container">
            {/* Icon content here if any */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
