import React from 'react';
import './SmallProductBanner.css';

interface SmallProductBannerProps {
    title: string;
    subtitle: string;
    imageSrc: string;
    price?: string; // Optionnel
    buttonText: string;
    bgColor: string;
    badgeText?:string;
}

const SmallProductBanner: React.FC<SmallProductBannerProps> = ({ title, subtitle, imageSrc, price, buttonText, bgColor, badgeText }) => {
    return (
        <div className="small-banner" style={{ backgroundColor: bgColor }}>
            {badgeText && <span className="small-banner-badge">{badgeText}</span>}
            <div className="small-banner-content">
                <span className="small-banner-title">{title}</span>
                <p className="small-banner-subtitle">{subtitle}</p>
                <button className="small-banner-button">{buttonText}</button>
            </div>
            <div className="small-banner-image-wrapper">
                <img src={imageSrc} alt={title} className="small-banner-image" />
                {price && <span className="small-banner-price">{price}</span>}
            </div>
        </div>
    );
};

export default SmallProductBanner;