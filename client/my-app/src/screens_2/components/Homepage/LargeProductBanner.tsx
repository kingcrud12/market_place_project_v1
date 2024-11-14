import React from 'react';
import './LargeProductBanner.css';

interface LargeProductBannerProps {
    title: string;
    subtitle?: string;
    description: string;
    imageSrc: string;
    price: string;
    buttonText: string;
    badgeText?:string;
}

const LargeProductBanner: React.FC<LargeProductBannerProps> = ({ title, subtitle, description, imageSrc, price, buttonText, badgeText }) => {
    return (
        <div className="large-banner">
            {badgeText && <span className="large-banner-badge">{badgeText}</span>}
            <div className="large-banner-content">
                <span className="large-banner-title">{title}</span>
                <span className="large-banner-subtitle">{subtitle}</span>
                <span className="large-banner-description">{description}</span>
                <button className="large-banner-button">{buttonText}</button>
            </div>
            <div className="large-banner-image-wrapper">
                <img src={imageSrc} alt={title} className="large-banner-image" />
                <span className="large-banner-price">{price}</span>
            </div>
        </div>
    );
};

export default LargeProductBanner;